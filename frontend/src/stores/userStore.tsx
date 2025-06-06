import { create } from 'zustand';
import bookingTemplates from '@/templates/BookingTemplates'; 

export const roles = [
  { id: 'customer', label: 'Customer' },
  ...bookingTemplates.map(t => ({ id: t.id, label: t.label })),
] as const;

type Role = typeof roles[number]['id'] | null;

interface UserState {
  role: Role;
  setRole: (role: Role) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
