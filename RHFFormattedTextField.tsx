import { Controller, Control } from 'react-hook-form';

interface RHFFormattedTextFieldProps extends Omit<BaseFormattedTextFieldProps, 'value' | 'onChange'> {
  name: string;
  control: Control<any>;
  rules?: any;
}

export default function RHFFormattedTextField({
  name,
  control,
  rules,
  ...props
}: RHFFormattedTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <BaseFormattedTextField
          {...props}
          value={field.value ?? ''}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
