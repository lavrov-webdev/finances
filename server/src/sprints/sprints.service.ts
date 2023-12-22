import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvelopesService } from 'src/envelopes/envelopes.service';

@Injectable()
export class SprintsService {
  constructor(
    private prisma: PrismaService,
    private envelopesService: EnvelopesService,
  ) {}
  async create(createSprintDto: CreateSprintDto, userId: number) {
    const { envelopes, ...createSprintData } = createSprintDto;
    const { id } = await this.prisma.sprint.create({
      data: { ...createSprintData, userId },
    });
    const createEnvelopesPromises = envelopes.map((e) => {
      return this.envelopesService.create(
        {
          ...e,
          sprintId: id,
        },
        userId,
      );
    });
    return Promise.all(createEnvelopesPromises).then(() =>
      this.prisma.sprint.findUnique({
        where: { id },
        include: { envelopes: true },
      }),
    );
  }

  async findAll(userId: number) {
    const sprints = await this.prisma.sprint.findMany({
      where: { userId },
      include: {
        transactions: {
          select: { amount: true },
        },
        envelopes: {
          select: { amount: true },
        },
      },
    });
    return sprints.map((s) => {
      const totalSpendings = s.transactions.reduce(
        (prev, curr) => curr.amount + prev,
        0,
      );
      const totalPlain = s.envelopes.reduce(
        (prev, curr) => curr.amount + prev,
        0,
      );
      const { envelopes, transactions, ...rest } = s;
      return {
        ...rest,
        totalSpendings,
        totalPlain,
      };
    });
  }

  async findOne(id: number, userId: number) {
    await this.checkIsUsersSprintOrThrow(id, userId);
    const findedSprint = await this.prisma.sprint.findUnique({
      where: { id },
      include: {
        envelopes: {
          include: {
            transactions: true,
          },
          orderBy: {
            category: {
              name: 'asc',
            },
          },
        },
        transactions: true,
      },
    });
    const { transactions: _, ...result } = findedSprint;
    const totalSpendings = findedSprint.transactions.reduce(
      (prev, curr) => curr.amount + prev,
      0,
    );
    return {
      ...result,
      currentBalance: findedSprint.startSum - totalSpendings,
    };
  }

  async findCurrent(userId: number) {
    const now = new Date(Date.now());
    return this.prisma.sprint.findFirst({
      where: {
        AND: {
          userId,
          startDate: {
            lte: now,
          },
          endDate: {
            gte: now,
          },
        },
      },
      select: { id: true },
    });
  }

  async update(id: number, updateSprintDto: UpdateSprintDto, userId: number) {
    await this.checkIsUsersSprintOrThrow(id, userId);
    return this.prisma.sprint.update({ where: { id }, data: updateSprintDto });
  }

  async remove(id: number, userId: number) {
    await this.checkIsUsersSprintOrThrow(id, userId);
    return this.prisma.sprint.delete({ where: { id } });
  }

  async checkIsUsersSprintOrThrow(sprintId: number, userId: number) {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id: sprintId },
    });
    if (!sprint || sprint.userId !== userId) {
      throw new NotFoundException('Sprint not found');
    }
    return sprint;
  }
}
