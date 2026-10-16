export interface SortOption {
  label: string;
  value: string;
}

export const PROGRAM_SORT_OPTIONS: SortOption[] = [
  { label: "Deadline Terdekat", value: "nearest" },
  { label: "Deadline Terjauh", value: "furthest" },
];
