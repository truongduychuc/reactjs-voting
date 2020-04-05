import * as React from "react";

export declare const EmptyTableRow: React.ComponentType<{
  cols: number;
}>;
export declare const TableRowsSkeleton: React.ComponentType<{
  cols: number;
  rows: number;
}>;

export interface PerPageOption {
  _k: number;
  _l: string | number;
}

export declare const PerPageFilter: React.ComponentType<{
  options: Array<PerPageOption>,
  onSelectionChange?: (value: number) => void
}>;

type TableField = {
  key: string,
  label: string,
  sortable?: boolean
}

export declare const HeadingRow: React.ComponentType<{
  fields: Array<TableField>,
  onSortingChanged?: (value: object) => void
}>;
