import { create } from 'zustand';
import { AdminUser } from '../lib/types';
import { authApi } from '../lib/api';

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>; // Make this async by returning Promise
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.login(email, password);
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false, error: null });
        return true;
      } else {
        set({ isLoading: false, error: 'Invalid email or password' });
        return false;
      }
    } catch {
      set({ isLoading: false, error: 'Login failed. Please try again.' });
      return false;
    }
  },

  logout: async () => {
    await authApi.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },

  // FIX: Make this async and await the session
  checkSession: async () => {
    const user = await authApi.getSession(); // Add await here
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
}));