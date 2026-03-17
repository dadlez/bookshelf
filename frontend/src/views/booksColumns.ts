export const BOOKS_COLUMNS: { key: string; header: string; sortKey?: string; width: number }[] = [
  { key: "title",     header: "Title",  sortKey: "title",      width: 3 },
  { key: "author",    header: "Author", sortKey: "author",     width: 2 },
  { key: "rating",    header: "Rating", sortKey: "rating",     width: 1 },
  { key: "pageCount", header: "Pages",  sortKey: "page_count", width: 1 },
  { key: "isbn",      header: "ISBN",   sortKey: "isbn",       width: 2 },
];
