import TextField from "@mui/material/TextField";

interface FilterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FilterInput({ label, value, onChange }: FilterInputProps) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{ minWidth: 200 }}
    />
  );
}
