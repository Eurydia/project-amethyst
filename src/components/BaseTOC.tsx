import {
	ListItem,
	ListItemText,
	Typography,
	List,
} from "@mui/material";
import { FC } from "react";
import { Fragment } from "react/jsx-runtime";

type BaseTOCProps = {
	children: { label: string; href: string }[];
};
export const BaseTOC: FC<BaseTOCProps> = (
	props,
) => {
	const { children } = props;

	const renderedItems = children.map(
		({ label, href }, index) => (
			<ListItem
				key={"toc" + index}
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
