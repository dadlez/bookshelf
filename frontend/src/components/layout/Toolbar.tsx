import Box from "@mui/material/Box";
import type { ReactNode } from "react";

export default function Toolbar({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
      {children}
    </Box>
  );
}
