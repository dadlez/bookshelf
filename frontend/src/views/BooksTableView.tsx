import { TableRow, TableCell, Button, Typography, Stack } from "@mui/material";
import type { Book } from "@bookshelf/shared";
import Table, { Column } from "../components/table/Table";
import { BOOKS_COLUMNS } from "./booksColumns";
import TitleFilter from "./TitleFilter";
import AuthorFilter from "./AuthorFilter";
import RatingFilter from "./RatingFilter";
import IsbnFilter from "./IsbnFilter";
import SearchBox from "./SearchBox";
import { useOrderParams } from "../lib/getBooks/order/useOrderParams";

const COLUMN_FILTERS: Partial<Record<string, React.ReactNode>> = {
  title: <TitleFilter />,
  author: <AuthorFilter />,
  rating: <RatingFilter />,
  isbn: <IsbnFilter />,
};

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
  const { orderParams, setOrder } = useOrderParams();

  const COLUMNS: Column<Book>[] = BOOKS_COLUMNS.map((col) => ({
    ...col,
    filter: COLUMN_FILTERS[col.key],
    render: (row: Book) => row[col.key as keyof Book] ?? "—",
  }));

  return (
    <Stack spacing={2}>
    <SearchBox />
    <Table<Book>
      columns={COLUMNS}
      rows={rows}
      emptyMessage={emptyMessage ?? "No books found"}
      sortBy={orderParams.sortBy}
      sortOrder={orderParams.sortOrder}
      onSort={setOrder}
    >
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
    </Stack>
  );
}
