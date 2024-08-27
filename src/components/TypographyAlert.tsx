import {
	Alert,
	AlertProps,
	Typography,
} from "@mui/material";
import { FC } from "react";

export const TypographyAlert: FC<AlertProps> = (
	props,
) => {
	const { children, ...rest } = props;
	return (
		<Alert
			{...rest}
			icon={false}
		>
			<Typography>{children}</Typography>
		</Alert>
	);
};
