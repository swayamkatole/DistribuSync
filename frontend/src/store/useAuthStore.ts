import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppConfig } from "../config/AppConfig";
import { AuthService } from "../services/AuthService";
import { AuthSession, LoginPayload, SignupPayload } from "../types";

/**
 * useAuthStore
 * ------------------------------------------------------------------
 * Global authentication state container (Zustand), functioning as the
 * frontend's `SecurityContextHolder` — a single source of truth for
 * "who is logged in right now" that any component can read/subscribe
 * to, persisted across reloads via localStorage.
 * ------------------------------------------------------------------
 */
interface AuthStoreState {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const session = await AuthService.login(payload);
          set({ session, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      signup: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const session = await AuthService.signup(payload);
          set({ session, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      loginAsGuest: async () => {
        set({ isLoading: true, error: null });
        try {
          const session = await AuthService.loginAsGuest();
          set({ session, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      logout: () => set({ session: null, isAuthenticated: false }),
      clearError: () => set({ error: null }),
    }),
    {
      name: AppConfig.STORAGE_KEYS.AUTH,
      partialize: (state) => ({ session: state.session, isAuthenticated: state.isAuthenticated }),
    }
  )
);
