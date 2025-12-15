import React from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface RHFNumberFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  control: Control<any>;
  allowDecimal?: boolean; // new prop
}

export function RHFNumberField({
  name,
  control,
  label,
  allowDecimal = false,
  ...props
}: RHFNumberFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          if (value === '' || value === undefined) return true; // optional
          const num = Number(value);
          return !isNaN(num) || 'Must be a valid number';
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          inputMode={allowDecimal ? 'decimal' : 'numeric'}
          slotProps={{
            htmlInput: {
              pattern: allowDecimal ? '[0-9]*[.,]?[0-9]*' : '[0-9]*',
              onBeforeInput: (e: InputEvent) => {
                const input = e.data ?? '';
                const current = (e.target as HTMLInputElement).value;

                if (allowDecimal) {
                  // allow digits or a single dot/comma
                  if (!/^[0-9.]$/.test(input)) {
                    e.preventDefault();
                  }
                  // prevent multiple dots
                  if ((input === '.' || input === ',') && current.includes('.')) {
                    e.preventDefault();
                  }
                } else {
                  if (!/^[0-9]$/.test(input)) {
                    e.preventDefault();
                  }
                }
              },
            },
          }}
          {...props}
        />
      )}
    />
  );
}
