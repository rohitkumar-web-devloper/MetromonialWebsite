import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userInfoStore = create(
  persist(
    (set) => ({
      user: "", // Initial user state

      // Method to update the user
      addUserInfo: (user) => set({ user }),

      // Method to update perSites
    }),
    {
      name: 'user-info', // Key for storing data in localStorage/sessionStorage
      getStorage: () => localStorage, // Default is localStorage, you can change to sessionStorage if needed
    }
  )
);
