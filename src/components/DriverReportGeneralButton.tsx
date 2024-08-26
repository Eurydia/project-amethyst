import { FlagRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";

type DriverReportGeneralButtonProps = {
	path: string;
	variant: "contained" | "outlined";
};
export const DriverReportGeneralButton: FC<
	DriverReportGeneralButtonProps
> = (props) => {
	const { path, variant } = props;
	const submit = useSubmit();
	const handleClick = () => {
		submit({}, { action: path });
	};
	return (
		<Box>
			<Button
				startIcon={<FlagRounded />}
				disableElevation
				variant={variant}
				onClick={handleClick}
			>
				รายงานปัญหาคนขับรถ
			</Button>
		</Box>
	);
};
