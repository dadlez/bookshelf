import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "./fetch";
import type { FilterParams } from "./filter/schema";

export function useGetBooks(filterParams?: FilterParams) {
  return useInfiniteQuery({
    queryKey: ["books", filterParams],
    queryFn: ({ pageParam }) => fetchBooks(pageParam, filterParams),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
