import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useSearchParams } from "../lib/getBooks/search/useSearchParams";

export default function SearchBox() {
  const { searchParams, setQ } = useSearchParams();
  const [draft, setDraft] = useState(searchParams.q ?? "");

  useEffect(() => {
    setDraft(searchParams.q ?? "");
  }, [searchParams.q]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setQ(draft || null);
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} direction="row" spacing={1}>
      <TextField
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Search books…"
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained" size="small">
        Search
      </Button>
    </Stack>
  );
}
