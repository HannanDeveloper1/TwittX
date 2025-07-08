import { create } from "zustand";

type AuthState = {
  user: null | User;
  isAuthentictated: boolean | undefined;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthentictated: undefined,
  login: (user: User) => set(() => ({ user, isAuthentictated: true })),
  logout: () => set(() => ({ user: null, isAuthentictated: false })),
}));
