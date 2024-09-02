import {
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import { FC, useEffect } from "react";

type VehicleClassRadioGroupProps = {
	value: string;
	onChange: (value: string) => void;
};
export const VehicleClassRadioGroup: FC<
	VehicleClassRadioGroupProps
> = (props) => {
	const { value, onChange } = props;

	useEffect(() => {
		if (value.length === 0) {
			onChange("รถตู้");
		}
		return () => {};
	}, []);

	return (
		<RadioGroup
			row
			value={value}
			onChange={(_, value) => onChange(value)}
		>
			<FormControlLabel
				value="รถตู้"
				control={<Radio />}
				label={<Typography>รถตู้</Typography>}
			/>
			<FormControlLabel
				value="รถบัส"
				control={<Radio />}
				label={<Typography>รถบัส</Typography>}
			/>
		</RadioGroup>
	);
};
