import {
	alpha,
	Grid,
	Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

type FormalLayoutProps = {
	children: { label: string; value: ReactNode }[];
};
export const FormalLayout: FC<
	FormalLayoutProps
> = (props) => {
	const { children } = props;
	const renderedFormItems = children.map(
		(item, index) => (
			<Grid
				key={"form-item" + index}
				container
				item
				paddingY={1}
				sx={{
					backgroundColor: ({ palette }) =>
						alpha(
							index % 2 === 0
								? palette.primary.light
								: palette.common.white,
							0.05,
						),
				}}
			>
				<Grid
					item
					xs={12}
					sm={3}
					display="flex"
					alignItems="center"
				>
					<Typography
						fontWeight="bold"
						width={200}
					>
						{item.label}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
				>
					{item.value}
				</Grid>
			</Grid>
		),
	);

	return (
		<Grid container>{renderedFormItems}</Grid>
	);
};
