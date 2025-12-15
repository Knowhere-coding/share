import { Controller, Control } from 'react-hook-form';

interface RHFFormattedTextFieldProps extends Omit<BaseFormattedTextFieldProps, 'value' | 'onChange'> {
  name: string;
  control: Control<any>;
  rules?: any;
}

export const RHFFormattedTextField: React.FC<RHFFormattedTextFieldProps> = ({
  name,
  control,
  rules,
  ...props
}) => {
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
