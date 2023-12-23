import { appAxios } from "@/config";

import {
  TCreateCategoryDto,
  TEditCategoryDto,
  TGetCategoryDto,
} from ".";

export const CATEGORIES_QUERY_KEY = "categories";

const createCategories = async (createCategoriesDto: TCreateCategoryDto[]) => {
  const { data } = await appAxios.post<TGetCategoryDto[]>(
    "/categories",
    createCategoriesDto
  );
  return data;
};

const editCategories = async (editCategoriesDto: TEditCategoryDto[]) => {
  const { data } = await appAxios.patch<TGetCategoryDto[]>(
    "/categories",
    editCategoriesDto
  );
  return data;
};

export const updateCategories = async ({
  newCategories,
  editableCategories,
}: {
  newCategories: TCreateCategoryDto[];
  editableCategories: TEditCategoryDto[];
}) => {
  await Promise.all([
    createCategories(newCategories),
    editCategories(editableCategories),
  ]);
  return true;
};

export const getAllCategories = async () => {
  const { data } = await appAxios.get<TGetCategoryDto[]>("/categories");
  return data;
};

export const deleteCategory = async (id: number) => {
  const { data } = await appAxios.delete<TGetCategoryDto>(`/categories/${id}`);
  return data;
};
