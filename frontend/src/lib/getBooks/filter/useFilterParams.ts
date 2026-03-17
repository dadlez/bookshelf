import { useQueryState, parseAsString } from "nuqs";
import type { FilterParams } from "./schema";

export function useFilterParams(): {
  filterParams: FilterParams;
  setAuthor: (value: string | null) => Promise<URLSearchParams>;
} {
  const [author, setAuthor] = useQueryState("author", parseAsString);
  return {
    filterParams: { author: author ?? undefined },
    setAuthor,
  };
}
