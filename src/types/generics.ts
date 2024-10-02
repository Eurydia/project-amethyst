import { ReactNode } from "react";

export type TableHeaderDefinition<T> = {
  render: (item: T) => ReactNode;
  compare: ((a: T, b: T) => number) | null;
  label: string;
};

export type InfoGroupItemDefinition = {
  label: string;
  value: ReactNode;
};
