import { useState } from "react";
import {
  IconButton,
  Popover,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { useFilterParams } from "../../lib/getBooks/filter/useFilterParams";

export default function AuthorFilterButton() {
  const { filterParams, setAuthor } = useFilterParams();
  const value = filterParams.author;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [draft, setDraft] = useState("");

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDraft(value ?? "");
    setAnchorEl(e.currentTarget);
  };

  const commit = (val: string) => {
    setAnchorEl(null);
    setAuthor(val.trim() || null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commit(draft);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{ color: value ? "orange" : "action.active", p: 0.25, ml: 0.5, verticalAlign: "middle" }}
      >
        <FilterListIcon fontSize="small" />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => commit(draft)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 1 }}>
          <TextField
            autoFocus
            size="small"
            placeholder="Filter by author…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ width: 220 }}
            slotProps={{
              input: {
                endAdornment: draft ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      onClick={() => { setAuthor(null); setDraft(""); setAnchorEl(null); }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
              },
            }}
          />
        </Box>
      </Popover>
    </>
  );
}
