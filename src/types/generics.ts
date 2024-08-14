import { ReactNode } from "react";

export type TableHeaderDefinition<
	T extends Object,
> = {
	render: (item: T) => ReactNode;
	compare: ((a: T, b: T) => number) | null;
	key: keyof T;
	label: string;
};
