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

type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

export type SnakeCaseToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};

export type Validator<T> = {
  validate: (value: unknown) => Promise<T | null>;
};

export type Transformer<In, Out> = {
  transform: (value: In) => Promise<Out>;
};
