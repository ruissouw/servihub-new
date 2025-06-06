import { act } from '@testing-library/react'
import { useUserStore, roles } from '../stores/userStore';  
import { describe, it, expect, beforeEach } from 'vitest'

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.setState({ role: null });
  });

  it('should initialize with role as null', () => {
    const role = useUserStore.getState().role;
    expect(role).toBeNull();
  });

  it('should update role correctly', () => {
    const newRole = roles[0].id; 

    act(() => {
      useUserStore.getState().setRole(newRole);
    });

    const updatedRole = useUserStore.getState().role;
    expect(updatedRole).toBe(newRole);
  });

  it('should allow setting role to null', () => {
    act(() => {
      useUserStore.getState().setRole(null);
    });

    expect(useUserStore.getState().role).toBeNull();
  });
});
