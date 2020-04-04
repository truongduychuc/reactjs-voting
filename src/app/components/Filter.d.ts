import * as React from "react";

export interface FilterProps {
  options: Array<object>;
  onSelectionChange: (value: number) => void;
  placeholder: string;
  inputClassName: string;
  defaultValue: string | number | null;
}
export declare const Filter: React.ComponentType<FilterProps>;
