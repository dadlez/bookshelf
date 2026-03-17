import FilterPopover from "../components/layout/FilterPopover";
import FilterInput from "../components/form/FilterInput";
import { useFilterParams } from "../lib/getBooks/filter/useFilterParams";

export default function TitleFilter() {
  const { filterParams, setTitle } = useFilterParams();

  return (
    <FilterPopover active={!!filterParams.title}>
      {(close) => (
        <FilterInput
          placeholder="Filter by title…"
          value={filterParams.title ?? null}
          onChange={(v) => setTitle(v?.trim() || null)}
          close={close}
        />
      )}
    </FilterPopover>
  );
}
