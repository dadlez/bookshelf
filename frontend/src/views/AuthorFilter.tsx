import FilterPopover from "../components/layout/FilterPopover";
import FilterInput from "../components/form/FilterInput";
import { useFilterParams } from "../lib/getBooks/filter/useFilterParams";

export default function AuthorFilter() {
  const { filterParams, setAuthor } = useFilterParams();

  return (
    <FilterPopover active={!!filterParams.author}>
      {(close) => (
        <FilterInput
          placeholder="Filter by author…"
          value={filterParams.author ?? null}
          onChange={(v) => setAuthor(v?.trim() || null)}
          close={close}
        />
      )}
    </FilterPopover>
  );
}
