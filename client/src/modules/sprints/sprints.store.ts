import { create } from "zustand";

import { TEditSprintDto } from ".";

type TSprintsStore = {
  editableSprint: TEditSprintDto | null;
  clearEditableSprint: () => void;
  setEditableSprint: (sprint: TEditSprintDto) => void;
};

export const useSrpintsStore = create<TSprintsStore>()((set) => ({
  editableSprint: null,
  clearEditableSprint: () => {
    set({ editableSprint: null });
  },
  setEditableSprint: (editableSprint) => {
    set({ editableSprint });
  },
}));
