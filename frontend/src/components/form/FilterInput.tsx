import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";

interface FilterInputProps {
  placeholder: string;
  value: string | null;
  onChange: (value: string | null) => void;
  close: () => void;
  width?: number;
}

export default function FilterInput({ placeholder, value, onChange, close, width = 220 }: FilterInputProps) {
  return (
    <TextField
      autoFocus
      size="small"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") close(); }}
      sx={{ width }}
      slotProps={{
        input: {
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" edge="end" onClick={() => onChange(null)}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
