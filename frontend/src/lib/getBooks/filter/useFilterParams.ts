import { useQueryState, parseAsString, parseAsFloat } from "nuqs";
import type { FilterParams } from "./schema";

export function useFilterParams(): {
  filterParams: FilterParams;
  setTitle: (value: string | null) => Promise<URLSearchParams>;
  setAuthor: (value: string | null) => Promise<URLSearchParams>;
  setIsbn: (value: string | null) => Promise<URLSearchParams>;
  setMinRating: (value: number | null) => Promise<URLSearchParams>;
  setMaxRating: (value: number | null) => Promise<URLSearchParams>;
} {
  const [title, setTitle] = useQueryState("title", parseAsString);
  const [author, setAuthor] = useQueryState("author", parseAsString);
  const [isbn, setIsbn] = useQueryState("isbn", parseAsString);
  const [minRating, setMinRating] = useQueryState("minRating", parseAsFloat);
  const [maxRating, setMaxRating] = useQueryState("maxRating", parseAsFloat);
  return {
    filterParams: {
      title: title ?? undefined,
      author: author ?? undefined,
      isbn: isbn ?? undefined,
      minRating: minRating ?? undefined,
      maxRating: maxRating ?? undefined,
    },
    setTitle,
    setAuthor,
    setIsbn,
    setMinRating,
    setMaxRating,
  };
}
