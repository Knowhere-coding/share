import { useState, useEffect, ChangeEvent } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface BaseFormattedTextFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  format?: (value: string) => string;
  parse?: (displayValue: string) => string;
}

export default function BaseFormattedTextField({
  value,
  onChange,
  format = (v) => v,
  parse = (v) => v,
  label,
  placeholder,
  helperText,
  error,
  disabled,
  size,
  variant,
}: BaseFormattedTextFieldProps) {
  const [internalValue, setInternalValue] = useState(format(value));

  // internen Wert in sync halten, wenn Eltern-Element den Wert aendert
  useEffect(() => {
    setInternalValue(format(value));
  }, [value, format]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = parse(e.target.value);
    setInternalValue(format(rawValue));
    onChange(rawValue);
  };

  return <TextField 
           value={internalValue} 
           onChange={handleChange}
           label={label}
           placeholder={placeholder}
           helperText={helperText}
           error={error}
           disabled={disabled}
           size={size}
           variant={variant}
         />;
};
