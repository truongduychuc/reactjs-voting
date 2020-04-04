import * as React from "react";

export interface SearchProps {
  placeholder: string;
  debounce: number | null | undefined;
  onChange: (value: number|string) => void;
}
export declare const SearchInput: React.ComponentType<SearchProps>;
