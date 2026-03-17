import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBookSchema, type AddBookBody } from "@bookshelf/shared";
import { useAddBook } from "../lib/addBook/mutation";

interface AddBookDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddBookDialog({ open, onClose }: AddBookDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookBody>({
    resolver: zodResolver(addBookSchema),
  });

  const { mutate, isPending, error } = useAddBook(() => {
    reset();
    onClose();
  });

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add book</DialogTitle>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <DialogContent>
          <Stack spacing={2} pt={1}>
            {error && <Alert severity="error">{error.message}</Alert>}
            <TextField
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
            <TextField
              label="Author"
              {...register("author")}
              error={!!errors.author}
              helperText={errors.author?.message}
              fullWidth
            />
            <TextField
              label="ISBN"
              {...register("isbn")}
              error={!!errors.isbn}
              helperText={errors.isbn?.message}
              fullWidth
            />
            <TextField
              label="Page count"
              type="number"
              {...register("pageCount", { valueAsNumber: true })}
              error={!!errors.pageCount}
              helperText={errors.pageCount?.message}
              fullWidth
            />
            <TextField
              label="Rating (1–5)"
              type="number"
              slotProps={{ htmlInput: { min: 1, max: 5, step: 0.1 } }}
              {...register("rating", { valueAsNumber: true })}
              error={!!errors.rating}
              helperText={errors.rating?.message}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "Adding…" : "Add book"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
