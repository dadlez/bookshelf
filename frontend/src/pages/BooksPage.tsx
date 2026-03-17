import { useState } from "react";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import PageWrapper from "../components/layout/PageWrapper";
import BooksTableView from "../views/BooksTableView";
import AddBookDialog from "../views/AddBookDialog";
import { useGetBooks } from "../lib/getBooks/query";
import { useFilterParams } from "../lib/getBooks/filter/useFilterParams";
import { useOrderParams } from "../lib/getBooks/order/useOrderParams";
import { useSearchParams } from "../lib/getBooks/search/useSearchParams";
import type { Book } from "@bookshelf/shared";

export default function BooksPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { filterParams } = useFilterParams();
  const { orderParams } = useOrderParams();
  const { searchParams } = useSearchParams();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useGetBooks(filterParams, orderParams, searchParams);
  const isRefetching = isFetching && !isFetchingNextPage;

  const rows: Book[] = data?.pages.flatMap((page) => page.data) ?? [];
  const emptyMessage = error?.message ?? "No books found";

  return (
    <PageWrapper>
      <BooksTableView
        rows={rows}
        emptyMessage={emptyMessage}
        hasNextPage={hasNextPage}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
      <Fab
        color="primary"
        aria-label="Add book"
        onClick={() => setDialogOpen(true)}
        sx={{ position: "fixed", bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>
      <AddBookDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </PageWrapper>
  );
}
