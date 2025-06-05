import React, { useState } from 'react';
import type { FieldSpec } from '../types.ts';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import type { Field } from 'react-hook-form';

type Props = {
  fields: FieldSpec[];
  formData: Record<string, any>;
  setFormData: (v: Record<string, any>) => void;
};


const DynamicForm = ({ fields, formData, setFormData }: Props) => {
  const handleChange = (id: string, value: any) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const val = formData[field.id] ?? '';
        switch (field.type) {
          case 'text':
          case 'number':
            return (
              <Input
                key={field.id}
                type={field.type === 'number' ? 'number' : 'text'}
                placeholder={field.label}
                value={val}
                required={field.required}
                min={field?.min}
                max={field?.max}
                onChange={e => handleChange(field.id, e.target.valueAsNumber)}
              />
            );
          case 'textarea':
            return (
              <Textarea
                key={field.id}
                placeholder={field.label}
                value={val}
                onChange={e => handleChange(field.id, e.target.value)}
              />
            );
          case 'select':
            return (
              <Select
                key={field.id}
                onValueChange={v => handleChange(field.id, v)}
                value={val}
              >
                <SelectTrigger>{val || field.label}</SelectTrigger>
                <SelectContent>
                  {field.options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          case 'toggle':
            return (
              <div key={field.id} className="flex items-center space-x-2">
                <Switch
                  checked={val}
                  onCheckedChange={v => handleChange(field.id, v)}
                />
                <label>{field.label}</label>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default DynamicForm