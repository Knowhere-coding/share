function AdminFilter(props: GridRenderHeaderFilterProps) {
  const { colDef } = props;
  const apiRef = useGridApiContext();
  const filterModel = useGridSelector(apiRef, gridFilterModelSelector);

  const operators = colDef.filterOperators ?? [];

  const filterItem =
    filterModel.items.find((item) => item.field === colDef.field) ?? {
      id: colDef.field,
      field: colDef.field,
      operator: operators[0]?.value,
      value: '',
    };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleValueChange = (event: SelectChangeEvent) => {
    apiRef.current.upsertFilterItem({
      ...filterItem,
      value: event.target.value || undefined,
    });
  };

  const handleOperatorChange = (operator: string) => {
    apiRef.current.upsertFilterItem({
      ...filterItem,
      operator,
    });
    setAnchorEl(null);
  };

  const currentOperator = operators.find(
    (op) => op.value === filterItem.operator,
  );

  return (
    <FormControl size="small" fullWidth>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Operator button */}
        <Tooltip title={currentOperator?.label ?? 'Operator'}>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <FilterAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Value input */}
        <Select
          value={filterItem.value ?? ''}
          onChange={handleValueChange}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
      </div>

      {/* Operator menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {operators.map((operator) => (
          <MenuItem
            key={operator.value}
            selected={operator.value === filterItem.operator}
            onClick={() => handleOperatorChange(operator.value)}
          >
            {operator.label}
          </MenuItem>
        ))}
      </Menu>
    </FormControl>
  );
}
