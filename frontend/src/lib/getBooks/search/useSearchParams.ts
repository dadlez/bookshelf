import { useQueryState, parseAsString } from "nuqs";
import type { SearchParams } from "./schema";

export function useSearchParams(): {
  searchParams: SearchParams;
  setQ: (value: string | null) => Promise<URLSearchParams>;
} {
  const [q, setQ] = useQueryState("q", parseAsString);
  return {
    searchParams: { q: q ?? undefined },
    setQ,
  };
}
