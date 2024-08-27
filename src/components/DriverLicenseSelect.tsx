import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import { FC } from "react";

type LicenseSelectProps = {
	value: "ท.1" | "ท.2";
	onChange: (value: "ท.1" | "ท.2") => void;
};
export const DriverLicenseSelect: FC<
	LicenseSelectProps
> = (props) => {
	const { value, onChange } = props;

	const handleChange = (
		_: any,
		value: string,
	) => {
		onChange(value as "ท.1" | "ท.2");
	};

	return (
		<FormControl>
			<FormLabel>
				<Typography>ประเภทใบขับขี่</Typography>
			</FormLabel>
			<RadioGroup
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel
					value="ท.1"
					control={<Radio />}
					label={
						<Typography>
							ประเภท ท.1 (รถตู้)
						</Typography>
					}
				/>
				<FormControlLabel
					value="ท.2"
					control={<Radio />}
					label={
						<Typography>
							ประเภท ท.2 (รถบัส)
						</Typography>
					}
				/>
			</RadioGroup>
		</FormControl>
	);
};
