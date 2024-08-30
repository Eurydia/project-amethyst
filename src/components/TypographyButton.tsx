import {
	Box,
	Button,
	ButtonProps,
	Typography,
} from "@mui/material";
import { FC } from "react";

export const TypographyButton: FC<ButtonProps> = (
	props,
) => {
	const { children, ...rest } = props;
	return (
		<Box>
			<Button
				{...rest}
				disableElevation
				disableRipple
			>
				<Typography>{children}</Typography>
			</Button>
		</Box>
	);
};
