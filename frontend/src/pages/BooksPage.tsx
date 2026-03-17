import PageWrapper from "../components/layout/PageWrapper";
import BooksTableView from "../views/BooksTableView";
import { useGetBooks } from "../lib/getBooks/query";
import type { Book } from "@bookshelf/shared";

export default function BooksPage() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetBooks();

  const rows: Book[] = data?.pages.flatMap((page) => page.data) ?? [];
  const emptyMessage = error?.message ?? "No books found";

  return (
    <PageWrapper>
      <BooksTableView
        rows={rows}
        emptyMessage={emptyMessage}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </PageWrapper>
  );
}
