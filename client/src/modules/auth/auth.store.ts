import { create } from "zustand";

import { getUserInformation, logout, signIn, signUp,TAuthDto } from ".";

type TAuthState = {
  signIn: (credentials: TAuthDto) => Promise<void>;
  signUp: (credentials: TAuthDto) => Promise<void>;
  logout: () => Promise<void>;
  init: () => Promise<void>;
} & (
  | {
      isAuthorized: true;
      id: number;
      email: string;
    }
  | {
      isAuthorized: false;
      id: null;
      email: null;
    }
);

export const useAuthStore = create<TAuthState>()((set) => ({
  isAuthorized: false,
  email: null,
  id: null,
  signIn: async (credentials) => {
    const user = await signIn(credentials);
    set({ id: user.id, email: user.email, isAuthorized: true });
  },
  signUp: async (credentials) => {
    const user = await signUp(credentials);
    set({ id: user.id, email: user.email, isAuthorized: true });
  },
  init: async () => {
    try {
      const user = await getUserInformation();
      set({ id: user.id, email: user.email, isAuthorized: true });
    } catch (e) {
      set({ id: null, email: null, isAuthorized: false });
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ email: null, isAuthorized: false, id: null });
    } catch (error) {
      console.log({ error });
    }
  },
}));
