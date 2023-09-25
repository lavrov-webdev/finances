import { z } from "zod";

export const CreateCategoryDto = z.object({
  name: z.string().max(100).nonempty("Введите название категории"),
  isWaste: z.boolean(),
});
export type TCreateCategoryDto = z.infer<typeof CreateCategoryDto>;

export const EditCategoryDto = CreateCategoryDto.extend({
  id: z.number().min(0),
});
export type TEditCategoryDto = z.infer<typeof EditCategoryDto>;

export const GetCategoryDto = CreateCategoryDto.extend({
  id: z.number().min(0),
  createdAt: z.string().datetime(),
  editedAt: z.string().datetime(),
  isActive: z.boolean(),
  userId: z.number().min(0),
});
export type TGetCategoryDto = z.infer<typeof GetCategoryDto>;

export const UpdateCategoriesFormFields = z.object({
  newCategories: CreateCategoryDto.array(),
  editableCategories: EditCategoryDto.array(),
});
export type TUpdateCategoriesFormFields = z.infer<
  typeof UpdateCategoriesFormFields
>;
