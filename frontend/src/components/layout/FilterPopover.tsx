import { useState } from "react";
import { IconButton, Popover, Box } from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import type { ReactNode } from "react";

interface FilterPopoverProps {
  active: boolean;
  children: (close: () => void) => ReactNode;
}

export default function FilterPopover({ active, children }: FilterPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{ color: active ? "orange" : "action.active", p: 0.25, ml: 0.5, verticalAlign: "middle" }}
      >
        <FilterListIcon fontSize="small" />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 1 }}>{children(handleClose)}</Box>
      </Popover>
    </>
  );
}
