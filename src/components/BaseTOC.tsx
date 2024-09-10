import { List } from "@mui/material";
import { FC } from "react";
import { BaseTOCItem } from "./BaseTOCItem";

type BaseTOCProps = {
	children: { label: string; href: string }[];
};
export const BaseTOC: FC<BaseTOCProps> = (
	props,
) => {
	const { children } = props;

	const renderedItems = children.map(
		({ label, href }, index) => (
			<BaseTOCItem
				key={"toc-item" + index}
				href={href}
				label={label}
			/>
		),
	);

	return (
		<List
			dense
			disablePadding
		>
			{renderedItems}
		</List>
	);
};
