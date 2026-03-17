import { TableRow, TableCell, Button, Typography } from "@mui/material";
import type { Book } from "@bookshelf/shared";
import Table, { Column } from "../components/table/Table";
import { BOOKS_COLUMNS } from "./booksColumns";
import AuthorFilterButton from "../components/form/AuthorFilterButton";

interface BooksTableViewProps {
  rows: Book[];
  emptyMessage?: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export default function BooksTableView({
  rows,
  emptyMessage,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: BooksTableViewProps) {
  const COLUMNS: Column<Book>[] = BOOKS_COLUMNS.map((col) => ({
    ...col,
    header:
      col.key === "author" ? (
        <>
          {col.header}
          <AuthorFilterButton />
        </>
      ) : (
        col.header
      ),
    render: (row: Book) => row[col.key as keyof Book] ?? "—",
  }));

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
