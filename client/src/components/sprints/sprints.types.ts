import { z } from "zod";
import {
  CreateEnvelopeDto,
  GetEnvelopeDto,
  GetEnvelopeWithTransactionsDto,
} from "../envelopes";

export const CreateSprintDto = z.object({
  startDate: z.date({ required_error: "Введите дату начала" }),
  endDate: z.date({ required_error: "Введите дату окончания" }),
  startSum: z.number({ required_error: "Введите начальную сумму" }),
  envelopes: z.array(CreateEnvelopeDto),
});
export type TCreateSprintDto = z.infer<typeof CreateSprintDto>;

export const SprintDates = CreateSprintDto.omit({
  envelopes: true,
});
export type TSprintDates = z.infer<typeof SprintDates>;

export const GetSprintDto = CreateSprintDto.extend({
  id: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).omit({ envelopes: true });
export type TGetSprintDto = z.infer<typeof GetSprintDto>;

export const EditSprintDto = CreateSprintDto.extend({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
}).omit({ envelopes: true });
export type TEditSprintDto = z.infer<typeof EditSprintDto>;

export const GetSprintWithTotalSpendingsAndPlainDto = GetSprintDto.extend({
  totalSpendings: z.number(),
  totalPlain: z.number(),
});
export type TGetSprintWithTotalSpendingsAndPlainDto = z.infer<
  typeof GetSprintWithTotalSpendingsAndPlainDto
>;

export const GetSprintWithEnvelopesDto = GetSprintDto.extend({
  envelopes: z.array(GetEnvelopeDto),
});
export type TGetSprintWithEnvelopesDto = z.infer<
  typeof GetSprintWithEnvelopesDto
>;

export const GetSprintWithEnvelopesAndTransactionsDto = GetSprintDto.extend({
  envelopes: z.array(GetEnvelopeWithTransactionsDto),
});
export type TGetSprintWithEnvelopesAndTransactionsDto = z.infer<
  typeof GetSprintWithEnvelopesAndTransactionsDto
>;
