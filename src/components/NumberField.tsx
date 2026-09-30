import type { ChangeEvent } from 'react';
import { InputAdornment, TextField } from '@mui/material';

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
  error?: string;
  min?: number;
  step?: number;
  endAdornment?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  helperText,
  error,
  min = 0,
  step = 0.01,
  endAdornment,
}: NumberFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const next = raw === '' ? 0 : Number(raw.replace(',', '.'));
    onChange(Number.isFinite(next) ? next : 0);
  };

  return (
    <TextField
      label={label}
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={handleChange}
      error={Boolean(error)}
      helperText={error ?? helperText}
      inputProps={{ min, step, inputMode: 'decimal' }}
      InputProps={endAdornment ? { endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment> } : undefined}
    />
  );
}
