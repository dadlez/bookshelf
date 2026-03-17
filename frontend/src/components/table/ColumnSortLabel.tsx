import { Box, TableSortLabel } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { ReactNode } from "react";

interface ColumnSortLabelProps {
  active: boolean;
  direction?: "asc" | "desc";
  onClick: () => void;
  children: ReactNode;
}

export default function ColumnSortLabel({ active, direction, onClick, children }: ColumnSortLabelProps) {
  if (active) {
    return (
      <TableSortLabel
        active
        direction={direction ?? "asc"}
        onClick={onClick}
        sx={{ color: "orange", "& .MuiTableSortLabel-icon": { color: "orange !important" } }}
      >
        {children}
      </TableSortLabel>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none", gap: 0.5 }}
    >
      {children}
      <UnfoldMoreIcon sx={{ fontSize: "1rem" }} />
    </Box>
  );
}
