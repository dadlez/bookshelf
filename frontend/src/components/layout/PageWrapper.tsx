import { Box } from "@mui/material";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 3 }}>
      {children}
    </Box>
  );
}
