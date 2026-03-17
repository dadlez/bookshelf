import { TableRow, TableCell, Button, Typography } from "@mui/material";
import type { Book } from "@bookshelf/shared";
import Table, { Column } from "../components/table/Table";
import { BOOKS_COLUMNS } from "./booksColumns";

const COLUMNS: Column<Book>[] = BOOKS_COLUMNS.map((col) => ({
  ...col,
  render: (row: Book) => row[col.key as keyof Book] ?? "—",
}));

interface BooksTableViewProps {
  rows: Book[];
  emptyMessage?: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export default function BooksTableView({ rows, emptyMessage, hasNextPage, isFetchingNextPage, onLoadMore }: BooksTableViewProps) {
  return (
    <Table<Book> columns={COLUMNS} rows={rows} emptyMessage={emptyMessage ?? "No books found"}>
      <TableRow>
        <TableCell colSpan={BOOKS_COLUMNS.length} align="center">
          {hasNextPage ? (
            <Button onClick={onLoadMore} disabled={isFetchingNextPage} size="small">
              {isFetchingNextPage ? "Loading…" : "Load more"}
            </Button>
          ) : (
            <Typography variant="body2" color="text.secondary">
              All books loaded
            </Typography>
          )}
        </TableCell>
      </TableRow>
    </Table>
  );
}
