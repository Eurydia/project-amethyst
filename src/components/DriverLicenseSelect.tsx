import {
	Autocomplete,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { FC } from "react";

const OPTIONS = [1, 2];

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
				row
				value={value}
				onChange={handleChange}
			>
				{OPTIONS.map((option, index) => (
					<FormControlLabel
						key={"option" + index}
						value={"type" + option}
						control={<Radio />}
						label={"ประเภท " + option}
					/>
				))}
			</RadioGroup>
		</FormControl>

		// <Autocomplete
		// 	onChange={handleChange}
		// 	options={OPTIONS}
		// 	renderInput={(params) => (
		// 		<TextField
		// 			{...params}
		// 			placeholder="ประเภทใบขับขี่"
		// 		/>
		// 	)}
		// />
	);
};
