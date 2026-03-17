import { useQueryState, parseAsStringLiteral } from "nuqs";
import { orderSchema, type OrderParams } from "./schema";

const SORT_BY_VALUES = orderSchema.shape.sortBy.unwrap().options;
const SORT_ORDER_VALUES = orderSchema.shape.sortOrder.unwrap().options;

export function useOrderParams(): {
  orderParams: OrderParams;
  setOrder: (sortBy: string) => void;
} {
  const [sortBy, setSortBy] = useQueryState("sortBy", parseAsStringLiteral(SORT_BY_VALUES));
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", parseAsStringLiteral(SORT_ORDER_VALUES));

  function setOrder(newSortBy: string) {
    const result = orderSchema.shape.sortBy.safeParse(newSortBy);
    if (!result.success) return;
    if (result.data === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(result.data ?? null);
      setSortOrder("asc");
    }
  }

  return {
    orderParams: {
      sortBy: sortBy ?? undefined,
      sortOrder: sortOrder ?? undefined,
    },
    setOrder,
  };
}
