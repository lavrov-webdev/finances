import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnvelopeDto } from './dto/create-envelope.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEnvelopeDto } from './dto/update-envelope.dto';

@Injectable()
export class EnvelopesService {
  constructor(private prisma: PrismaService) {}
  async getOne(id: number, userId: number) {
    return this.checkIsUsersEnvelopeAndReturnThemOrThrow(id, userId);
  }
  async create(createEnvelopeDto: CreateEnvelopeDto, userId: number) {
    const findedCategory = await this.prisma.category.findUnique({
      where: { id: createEnvelopeDto.categoryId },
      select: { userId: true },
    });
    if (!findedCategory || findedCategory.userId !== userId)
      throw new NotFoundException('Category not found');
    return this.prisma.envelope.create({
      data: { ...createEnvelopeDto, userId },
    });
  }

  async update(
    id: number,
    updateEnvelopeDto: UpdateEnvelopeDto,
    userId: number,
  ) {
    await this.checkIsUsersEnvelopeAndReturnThemOrThrow(id, userId);
    return this.prisma.envelope.update({
      where: { id },
      data: updateEnvelopeDto,
    });
  }

  async getAllByDate(date: string, userId: number) {
    return this.prisma.envelope.findMany({
      where: {
        userId,
        sprint: {
          startDate: {
            lte: date,
          },
          endDate: {
            gt: date,
          },
        },
      },
      include: {
        sprint: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async checkIsUsersEnvelopeAndReturnThemOrThrow(
    envelopeId: number,
    userId: number,
  ) {
    const envelope = await this.prisma.envelope.findUnique({
      where: { id: envelopeId },
    });
    if (!envelope || envelope.userId !== userId)
      throw new NotFoundException('Envelope not found');
    return envelope;
  }
}
