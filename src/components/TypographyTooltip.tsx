import {
	Tooltip,
	TooltipProps,
	Typography,
} from "@mui/material";
import { FC } from "react";

export const TypographyTooltip: FC<
	TooltipProps
> = (props) => {
	const { title, children, ...rest } = props;
	return (
		<Tooltip
			{...rest}
			arrow
			title={<Typography>{title}</Typography>}
		>
			{children}
		</Tooltip>
	);
};
