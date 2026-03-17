import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import {PropsWithChildren, ReactNode} from "react";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Proportional width, e.g. 2 means twice as wide as a column with width 1 */
  width?: number;
}

interface TableProps<T> extends PropsWithChildren {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
}

export default function Table<T>({ columns, rows, emptyMessage = "No results", children }: TableProps<T>) {
  const totalWidth = columns.reduce((sum, col) => sum + (col.width ?? 1), 0);

  return (
    <TableContainer component={Paper} sx={{ m: 2 }}>
      <MuiTable sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{ fontWeight: "bold", width: `${((col.width ?? 1) / totalWidth) * 100}%` }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ textAlign: "center", py: 6 }}>
                <Typography color="text.secondary">{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}>{col.render(row)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
          {children}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
