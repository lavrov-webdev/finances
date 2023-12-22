import { z } from "zod";
import { GetTransactionDto } from "@/components/transactions";

export const CreateEnvelopeDto = z.object({
  categoryId: z.number().min(0),
  amount: z
    .number({
      invalid_type_error: "Введите число",
      required_error: "Введите сумму",
    })
    .min(0, "Сумма не может быть меньше 0"),
});
export type TCreateEnvelopeDto = z.infer<typeof CreateEnvelopeDto>;

export const GetEnvelopeDto = CreateEnvelopeDto.extend({
  id: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  sprintId: z.number().min(0),
  userId: z.number().min(0),
  categoryId: z.number().min(0).nullable(),
});
export type TGetEnvelopeDto = z.infer<typeof GetEnvelopeDto>;

export const GetEnvelopeWithTransactionsDto = GetEnvelopeDto.extend({
  transactions: z.array(GetTransactionDto),
});
export type TGetEnvelopeWithTransactionsDto = z.infer<
  typeof GetEnvelopeWithTransactionsDto
>;

export const GetEnvelopesWithCategoryNameAndSprintDates = GetEnvelopeDto.extend(
  {
    category: z.object({ name: z.string() }),
    sprint: z.object({
      startDate: z.date({ required_error: "Введите дату начала" }),
      endDate: z.date({ required_error: "Введите дату окончания" }),
    }),
  }
);
export type TGetEnvelopesWithCategoryNameAndSprintDates = z.infer<
  typeof GetEnvelopesWithCategoryNameAndSprintDates
>;
