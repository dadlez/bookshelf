import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBook } from "./fetch";
import type { AddBookBody } from "@bookshelf/shared";

export function useAddBook(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddBookBody) => addBook(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onSuccess?.();
    },
  });
}
