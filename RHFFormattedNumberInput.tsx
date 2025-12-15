import { Controller, Control } from 'react-hook-form';

interface RHFFormattedNumberInputProps extends Omit<BaseFormattedNumberInputProps, 'value' | 'onChange'> {
  name: string;
  control: Control<any>;
  rules?: any;
}

export default function RHFFormattedNumberInput({
  name,
  control,
  rules,
  ...props
}: RHFFormattedNumberInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <BaseFormattedNumberInput
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
