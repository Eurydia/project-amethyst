import {
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { FC } from "react";

type CustomItemProps = {
	label: string;
	href: string;
};
const CustomItem: FC<CustomItemProps> = (
	props,
) => {
	const { label, href } = props;
	return (
		<ListItem
			disablePadding
			disableGutters
		>
			<ListItemText disableTypography>
				<Typography
					component="a"
					href={href}
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
			<CustomItem
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
