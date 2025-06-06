import type { FieldSpec } from '../types';
import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from '../components/DynamicForm';
import { vi } from 'vitest'; 
import { describe, it, expect } from 'vitest'

describe('DynamicForm', () => {
  const fields: FieldSpec[] = [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'age', label: 'Age', type: 'number', min: 0, max: 100 },
    { id: 'bio', label: 'Bio', type: 'textarea' },
    { 
      id: 'color', 
      label: 'Favorite Color', 
      type: 'select', 
      options: [
        { value: 'red', label: 'Red' }, 
        { value: 'green', label: 'Green' }
      ] 
    },
    { id: 'subscribe', label: 'Subscribe', type: 'toggle' },
  ];

  it('renders inputs and calls setFormData on change', () => {
    const initialData = { name: '', age: 0, bio: '', color: '', subscribe: false };
    const setFormData = vi.fn(); 

    render(<DynamicForm fields={fields} formData={initialData} setFormData={setFormData} />);

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Alice' },
    });
    expect(setFormData).toHaveBeenLastCalledWith({ ...initialData, name: 'Alice' });
  });
});

