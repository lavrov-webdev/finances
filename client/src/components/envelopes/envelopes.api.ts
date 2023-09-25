import { appAxios } from "@/config";
import dayjs from "dayjs";
import { TGetEnvelopesWithCategoryNameAndSprintDates } from "./envelopes.types";

export const getEnvelopesByDate = async (date: Date) => {
  const { data } = await appAxios.get<
    TGetEnvelopesWithCategoryNameAndSprintDates[]
  >(`/envelopes/by_date/${dayjs(date).format("YYYY-MM-DD")}`);
  return data;
};
