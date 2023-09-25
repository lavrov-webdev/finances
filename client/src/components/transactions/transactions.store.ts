import { create } from "zustand";
import {
  TGetEnvelopesWithCategoryNameAndSprintDates,
  getEnvelopesByDate,
} from "../envelopes";
import dayjs from "dayjs";
import { produce } from "immer";
import { TEditTransactionDto } from "./transactions.types";

type TEnvelopeByDate = {
  startDate: Date;
  endDate: Date;
  envelopes: TGetEnvelopesWithCategoryNameAndSprintDates[];
};

type TTransactionsStore = {
  envelopesByDates: TEnvelopeByDate[];
  getEnvelopesByDate: (
    date: Date
  ) => Promise<TGetEnvelopesWithCategoryNameAndSprintDates[]>;
  isEditModalOpen: boolean;
  editableTransactionData?: TEditTransactionDto;
  editableTransactionId?: number;
  openEditModal: (
    transactionData: TEditTransactionDto,
    editableTransactionId: number
  ) => void;
  closeEditModal: () => void;
};

export const useTransactionsStore = create<TTransactionsStore>()(
  (set, get) => ({
    envelopesByDates: [],
    lastDate: dayjs().toDate(),
    getEnvelopesByDate: async (date: Date) => {
      const envelopesFromCache = get().envelopesByDates.find((cacheItem) =>
        dayjs(date).isBetween(cacheItem.startDate, cacheItem.endDate)
      );
      if (envelopesFromCache) return envelopesFromCache.envelopes;
      const fetchedEnvelopes = await getEnvelopesByDate(date);
      if (fetchedEnvelopes.length === 0) return [];
      const newCacheItem: TEnvelopeByDate = {
        startDate: fetchedEnvelopes[0].sprint.startDate,
        endDate: fetchedEnvelopes[0].sprint.endDate,
        envelopes: fetchedEnvelopes,
      };
      set(
        produce((state: TTransactionsStore) => {
          state.envelopesByDates.push(newCacheItem);
        })
      );
      return newCacheItem.envelopes;
    },
    isEditModalOpen: false,
    editableTransactionData: undefined,
    editableTransactionId: undefined,
    openEditModal: (editableTransactionData, editableTransactionId) =>
      set({
        editableTransactionData,
        isEditModalOpen: true,
        editableTransactionId,
      }),
    closeEditModal: () =>
      set({
        isEditModalOpen: false,
        editableTransactionData: undefined,
        editableTransactionId: undefined,
      }),
  })
);
