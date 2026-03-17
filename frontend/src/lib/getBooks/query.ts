import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "./fetch";

export function useGetBooks() {
  return useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam }) => fetchBooks(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
