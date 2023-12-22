import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category.response.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto[], userId: number) {
    return Promise.all(
      createCategoryDto.map(async (category) => {
        const findedCategory = await this.prisma.category.findUnique({
          where: {
            name_userId: {
              name: category.name,
              userId,
            },
          },
        });
        if (!!findedCategory) {
          return await this.prisma.category.update({
            where: {
              name_userId: {
                name: category.name,
                userId: userId,
              },
            },
            data: { isActive: true },
          });
        } else {
          return await this.prisma.category.create({
            data: {
              ...category,
              userId: userId,
            },
          });
        }
      }),
    );
  }

  findAll(userId: number) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number, userId: number) {
    const category = await this.checkIsUsersCategoryOrThrow(id, userId);
    if (category?.isActive) return category;
    throw new NotFoundException('Category not found');
  }

  async update(updateCategoriesDto: UpdateCategoryDto[], userId: number) {
    const res: CategoryResponseDto[] = [];
    for (const newCategory of updateCategoriesDto) {
      try {
        await this.checkIsUsersCategoryOrThrow(newCategory.id, userId);
        const updateRes = await this.prisma.category.update({
          where: { id: newCategory.id },
          data: { name: newCategory.name },
        });
        res.push(updateRes);
      } catch (e) {
        console.error(e);
      }
    }
    return res;
  }

  async remove(id: number, userId: number) {
    await this.checkIsUsersCategoryOrThrow(id, userId);
    return this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async checkIsUsersCategoryOrThrow(categoryId: number, userId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category || category.userId !== userId)
      throw new NotFoundException('Category not found');
    return category;
  }
}
