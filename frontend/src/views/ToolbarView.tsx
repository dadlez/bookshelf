import Toolbar from "../components/layout/Toolbar";
import FilterInput from "../components/form/FilterInput";
import { useFilterParams } from "../lib/getBooks/filter/useFilterParams";

export default function ToolbarView() {
  const { filterParams, setAuthor } = useFilterParams();
  return (
    <Toolbar>
      <FilterInput
        label="Author"
        value={filterParams.author ?? ""}
        onChange={(value) => setAuthor(value || null)}
      />
    </Toolbar>
  );
}
