import type { Book } from "@bookshelf/shared";
import Table, { Column } from "../components/table/Table";
import { BOOKS_COLUMNS } from "../components/table/booksColumns";

const COLUMNS: Column<Book>[] = BOOKS_COLUMNS.map((col) => ({
  ...col,
  render: (row: Book) => row[col.key as keyof Book] ?? "—",
}));

interface BooksTableViewProps {
  rows: Book[];
  emptyMessage?: string;
}

export default function BooksTableView({ rows, emptyMessage }: BooksTableViewProps) {
  return <Table<Book> columns={COLUMNS} rows={rows} emptyMessage={emptyMessage ?? "No books found"} />;
}
