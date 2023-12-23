import { create } from "zustand";

type TRootStore = {
    theme: "light" | "dark",
    setTheme: (theme: TRootStore['theme']) => void
}

export const useRootStore = create<TRootStore>()(set => ({
    theme: "light",
    setTheme(theme) {
        set({ theme })
    },
}))