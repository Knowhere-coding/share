function RHFNumberField({
  name,
  control,
  label,
  rules,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        validate: value =>
          value === '' || !isNaN(Number(value)) || 'Must be a number',
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          inputMode="numeric"
          slotProps={{
            htmlInput: {
              pattern: '[0-9]*',
            },
          }}
          {...props}
        />
      )}
    />
  );
}
