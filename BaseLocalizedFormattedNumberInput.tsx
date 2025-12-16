import { TextField, TextFieldProps } from '@mui/material';
import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from 'react';

export interface BaseFormattedNumberInputProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: number | null;
  onChange: (value: number | null) => void;
  allowDecimal?: boolean;
  locale?: string;
}

/* ------------------ Locale helpers ------------------ */

function getNumberSeparators(locale: string) {
  const parts = new Intl.NumberFormat(locale).formatToParts(1000.1);
  return {
    group: parts.find(p => p.type === 'group')?.value ?? ',',
    decimal: parts.find(p => p.type === 'decimal')?.value ?? '.',
  };
}

function parseLocalizedNumber(
  input: string,
  locale: string,
  allowDecimal: boolean
): number | null {
  if (!input) return null;

  const { group, decimal } = getNumberSeparators(locale);

  let normalized = input.replace(new RegExp(`\\${group}`, 'g'), '');

  if (allowDecimal) {
    normalized = normalized.replace(new RegExp(`\\${decimal}`), '.');
  } else {
    normalized = normalized.split(decimal)[0];
  }

  const num = Number(normalized);
  return Number.isNaN(num) ? null : num;
}

function formatLocalizedNumber(
  value: number | null,
  locale: string,
  allowDecimal: boolean
): string {
  if (value == null) return '';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: allowDecimal ? 20 : 0,
  }).format(value);
}

/* ------------------ Component ------------------ */

export default function BaseFormattedNumberInput({
  value,
  onChange,
  allowDecimal = false,
  locale = navigator.language,
  ...props
}: BaseFormattedNumberInputProps) {
  const separators = useMemo(
    () => getNumberSeparators(locale),
    [locale]
  );

  const [internalValue, setInternalValue] = useState<string>(
    formatLocalizedNumber(value, locale, allowDecimal)
  );

  /* Keep internal state in sync with external value */
  useEffect(() => {
    setInternalValue(formatLocalizedNumber(value, locale, allowDecimal));
  }, [value, locale, allowDecimal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInternalValue(text);

    const parsed = parseLocalizedNumber(text, locale, allowDecimal);
    onChange(parsed);
  };

  /* UX-only prevention (not authoritative) */
  const handleBeforeInput = (e: FormEvent<HTMLInputElement>) => {
    if (!allowDecimal) {
      const input = (e.nativeEvent as InputEvent).data;
      if (input === separators.decimal) {
        e.preventDefault();
      }
    }
  };

  const handleBlur = () => {
    const parsed = parseLocalizedNumber(
      internalValue,
      locale,
      allowDecimal
    );
    setInternalValue(formatLocalizedNumber(parsed, locale, allowDecimal));
  };

  return (
    <TextField
      {...props}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      slotProps={{
        htmlInput: {
          onBeforeInput: handleBeforeInput,
        },
      }}
    />
  );
}
