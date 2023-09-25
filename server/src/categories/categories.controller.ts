import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category.response.dto';
import { RequestWithUser } from 'src/interfaces';

@ApiTags('categories')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: [CategoryResponseDto] })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(
    @Body() createCategoriesDto: [CreateCategoryDto],
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto[]> {
    return this.categoriesService.create(createCategoriesDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({ type: [CategoryResponseDto] })
  findAll(@Request() req: RequestWithUser): Promise<CategoryResponseDto[]> {
    return this.categoriesService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryResponseDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  findOne(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.findOne(+id, req.user.id);
  }

  @Patch()
  @ApiOkResponse({ type: [CategoryResponseDto] })
  @ApiNotFoundResponse({ description: 'Category not found' })
  update(
    @Body() updateCategoryDto: UpdateCategoryDto[],
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto[]> {
    return this.categoriesService.update(updateCategoryDto, req.user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CategoryResponseDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  remove(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.remove(+id, req.user.id);
  }
}
