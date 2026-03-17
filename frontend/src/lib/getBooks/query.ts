import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "./fetch";
import type { FilterParams } from "./filter/schema";
import type { OrderParams } from "./order/schema";
import type { SearchParams } from "./search/schema";

export function useGetBooks(filterParams?: FilterParams, orderParams?: OrderParams, searchParams?: SearchParams) {
  return useInfiniteQuery({
    queryKey: ["books", filterParams, orderParams, searchParams],
    queryFn: ({ pageParam }) => fetchBooks(pageParam, filterParams, orderParams, searchParams),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
