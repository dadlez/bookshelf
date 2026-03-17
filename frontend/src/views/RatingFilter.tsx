import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import FilterPopover from "../components/layout/FilterPopover";
import { useFilterParams } from "../lib/getBooks/filter/useFilterParams";

export default function RatingFilter() {
  const { filterParams, setMinRating, setMaxRating } = useFilterParams();

  const active = filterParams.minRating != null || filterParams.maxRating != null;

  const handleChange = (setter: (v: number | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setter(!isNaN(val) && val >= 1 && val <= 5 ? val : null);
  };

  const clearBoth = () => {
    setMinRating(null);
    setMaxRating(null);
  };

  return (
    <FilterPopover active={active}>
      {(close) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            autoFocus
            size="small"
            placeholder="Min (1–5)"
            value={filterParams.minRating ?? ""}
            onChange={handleChange(setMinRating)}
            onKeyDown={(e) => { if (e.key === "Enter") close(); }}
            sx={{ width: 120 }}
            type="number"
            slotProps={{ htmlInput: { min: 1, max: 5, step: 0.5 } }}
          />
          <TextField
            size="small"
            placeholder="Max (1–5)"
            value={filterParams.maxRating ?? ""}
            onChange={handleChange(setMaxRating)}
            onKeyDown={(e) => { if (e.key === "Enter") close(); }}
            sx={{ width: 120 }}
            type="number"
            slotProps={{ htmlInput: { min: 1, max: 5, step: 0.5 } }}
          />
          <IconButton size="small" onClick={clearBoth} disabled={!active} aria-label="Clear rating filters">
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </FilterPopover>
  );
}
