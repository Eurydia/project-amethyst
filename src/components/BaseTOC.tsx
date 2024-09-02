import {
	ListItem,
	ListItemText,
	Typography,
	List,
} from "@mui/material";
import { FC } from "react";
import { Fragment } from "react/jsx-runtime";

type CustomTOCItem = {
	label: string;
	href: string;
};
const CustomTOCItem: FC<CustomTOCItem> = (
	props,
) => {
	const { label, href } = props;
	return (
		<ListItem
			disablePadding
			disableGutters
		>
			<ListItemText>
				<Typography
					href={href}
					component="a"
				>
					{label}
				</Typography>
			</ListItemText>
		</ListItem>
	);
};
type BaseTOCProps = {
	children: { label: string; href: string }[];
};
export const BaseTOC: FC<BaseTOCProps> = (
	props,
) => {
	const { children } = props;

	const renderedItems = children.map(
		({ label, href }, index) => (
			<CustomTOCItem
				key={"toc-item" + index}
				href={href}
				label={label}
			/>
		),
	);
	return (
		<Fragment>
			<Typography>สารบัญ</Typography>
			<List
				dense
				disablePadding
			>
				{renderedItems}
			</List>
		</Fragment>
	);
};
