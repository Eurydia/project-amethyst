import { MedicalServicesRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";

type DriverReportMedicalButtonProps = {
	path: string;
	variant: "contained" | "outlined";
};
export const DriverReportMedicalButton: FC<
	DriverReportMedicalButtonProps
> = (props) => {
	const { path, variant } = props;
	const submit = useSubmit();
	const handleClick = () => {
		submit({}, { action: path });
	};
	return (
		<Box>
			<Button
				startIcon={<MedicalServicesRounded />}
				disableElevation
				variant={variant}
				onClick={handleClick}
			>
				บันทึกผลการตรวจสารเสพติด
			</Button>
		</Box>
	);
};
