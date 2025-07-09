import { create } from "zustand";

type AuthState = {
  user: null | User;
  isAuthenticated: boolean | undefined;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: undefined,
  login: (user: User) => set(() => ({ user, isAuthenticated: true })),
  logout: () => set(() => ({ user: null, isAuthenticated: false })),
}));
