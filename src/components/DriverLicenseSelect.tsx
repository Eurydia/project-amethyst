import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { FC } from "react";

type LicenseSelectProps = {
	value: string | null;
	onChange: (value: string | null) => void;
};
export const DriverLicenseSelect: FC<
	LicenseSelectProps
> = (props) => {
	const { value, onChange } = props;

	const handleChange = (
		_: any,
		value: string | null,
	) => {
		onChange(value);
	};

	return (
		<FormControl>
			<FormLabel>ประเภทใบขับขี่</FormLabel>
			<RadioGroup
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel
					value="1"
					control={<Radio />}
					label={"ประเภท ท.1 (รถตู้)"}
				/>
				<FormControlLabel
					value="2"
					control={<Radio />}
					label={"ประเภท ท.2 (รถบัส)"}
				/>
			</RadioGroup>
		</FormControl>
	);
};
