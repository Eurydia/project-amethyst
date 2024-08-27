import { MedicalServicesRounded } from "@mui/icons-material";
import { ButtonProps } from "@mui/material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { TypographyButton } from "./TypographyButton";

type DriverReportMedicalButtonProps =
	ButtonProps & {
		path: string;
	};
export const DriverReportMedicalButton: FC<
	DriverReportMedicalButtonProps
> = (props) => {
	const { path, ...rest } = props;
	const submit = useSubmit();
	const handleClick = () => {
		submit({}, { action: path });
	};
	return (
		<TypographyButton
			startIcon={<MedicalServicesRounded />}
			{...rest}
			disableElevation
			disableRipple
			onClick={handleClick}
		>
			บันทึกผลการตรวจสารเสพติด
		</TypographyButton>
	);
};
