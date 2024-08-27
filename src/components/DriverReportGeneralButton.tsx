import { FlagRounded } from "@mui/icons-material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { TypographyButton } from "./TypographyButton";
import { ButtonProps } from "@mui/material";

type DriverReportGeneralButtonProps =
	ButtonProps & {
		path: string;
	};
export const DriverReportGeneralButton: FC<
	DriverReportGeneralButtonProps
> = (props) => {
	const { path, ...rest } = props;
	const submit = useSubmit();
	const handleClick = () => {
		submit({}, { action: path });
	};
	return (
		<TypographyButton
			{...rest}
			startIcon={<FlagRounded />}
			onClick={handleClick}
		>
			รายงานปัญหาคนขับรถ
		</TypographyButton>
	);
};
