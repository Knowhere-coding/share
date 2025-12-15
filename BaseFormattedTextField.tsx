import React, { useState, useEffect } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface BaseFormattedTextFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  format?: (value: string) => string;
  parse?: (displayValue: string) => string;
}

export const BaseFormattedTextField: React.FC<BaseFormattedTextFieldProps> = ({
  value,
  onChange,
  format = (v) => v,
  parse = (v) => v,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(format(value));

  // Keep internal value in sync if parent changes it
  useEffect(() => {
    setInternalValue(format(value));
  }, [value, format]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parse(e.target.value);
    setInternalValue(format(rawValue));
    onChange(rawValue);
  };

  return <TextField {...props} value={internalValue} onChange={handleChange} />;
};
