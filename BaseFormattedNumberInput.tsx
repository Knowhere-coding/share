import { TextField, TextFieldProps } from '@mui/material';
import { useState, ChangeEvent, FormEvent } from 'react';

export interface BaseFormattedNumberInputProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
  allowDecimal?: boolean;
  format?: (value: string | number) => string;
  parse?: (displayValue: string) => any;
}

export default function BaseFormattedNumberInput({
  value,
  onChange,
  allowDecimal = false,
  format = (v) => v?.toString() ?? '',
  parse = (v) => v.replace(/,/g, ''),
  ...props
}: BaseFormattedNumberInputProps) {
  const [internalValue, setInternalValue] = useState(format(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = parse(e.target.value);
    setInternalValue(format(rawValue));
    onChange(rawValue);
  };

  const handleBeforeInput = (e: FormEvent<HTMLInputElement>) => {
    const input = (e.nativeEvent as InputEvent).data ?? '';
    const current = (e.target as HTMLInputElement).value;

    if (allowDecimal) {
      if (!/^[0-9.]$/.test(input)) e.preventDefault();
      if ((input === '.' || input === ',') && current.includes('.')) e.preventDefault();
    } else {
      if (!/^[0-9]$/.test(input)) e.preventDefault();
    }
  };

  return (
    <TextField
      {...props}
      value={internalValue}
      onChange={handleChange}
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      slotProps={{
        htmlInput: {
          pattern: allowDecimal ? '[0-9]*[.,]?[0-9]*' : '[0-9]*',
          onBeforeInput: handleBeforeInput,
        },
      }}
    />
  );
};
