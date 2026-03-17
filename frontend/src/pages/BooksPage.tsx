import PageWrapper from "../components/layout/PageWrapper";
import BooksTableView from "../views/BooksTableView";
import { useGetBooks } from "../lib/getBooks/query";
import { useFilterParams } from "../lib/getBooks/filter/useFilterParams";
import { useOrderParams } from "../lib/getBooks/order/useOrderParams";
import { useSearchParams } from "../lib/getBooks/search/useSearchParams";
import type { Book } from "@bookshelf/shared";

export default function BooksPage() {
  const { filterParams } = useFilterParams();
  const { orderParams } = useOrderParams();
  const { searchParams } = useSearchParams();
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetBooks(filterParams, orderParams, searchParams);

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
