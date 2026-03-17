import FilterPopover from "../components/layout/FilterPopover";
import FilterInput from "../components/form/FilterInput";
import { useFilterParams } from "../lib/getBooks/filter/useFilterParams";

export default function IsbnFilter() {
  const { filterParams, setIsbn } = useFilterParams();

  return (
    <FilterPopover active={!!filterParams.isbn}>
      {(close) => (
        <FilterInput
          placeholder="Filter by ISBN…"
          value={filterParams.isbn ?? null}
          onChange={(v) => setIsbn(v?.trim() || null)}
          close={close}
        />
      )}
    </FilterPopover>
  );
}
