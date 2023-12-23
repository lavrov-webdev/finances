import { create } from "zustand";
import { persist } from "zustand/middleware";

type TRootStore = {
  theme: "light" | "dark";
  setTheme: (theme: TRootStore["theme"]) => void;
};

export const useRootStore = create<TRootStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme(theme) {
        set({ theme });
      },
    }),
    {
      name: "root-store",
    },
  ),
);
