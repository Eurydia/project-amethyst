import {
	alpha,
	Grid2,
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
			<Grid2
				key={"form-item" + index}
				container
				size={12}
				sx={{
					paddingY: 1,
					backgroundColor: ({ palette }) =>
						alpha(
							index % 2 === 0
								? palette.primary.main
								: palette.background.default,
							0.05,
						),
				}}
			>
				<Grid2
					size={{
						xs: 12,
						sm: 3,
					}}
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Typography
						sx={{
							fontWeight: "bold",
						}}
					>
						{item.label}
					</Typography>
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 8,
					}}
				>
					{item.value}
				</Grid2>
			</Grid2>
		),
	);

	return (
		<Grid2
			container
			sx={{
				width: "100%",
			}}
		>
			{renderedFormItems}
		</Grid2>
	);
};
