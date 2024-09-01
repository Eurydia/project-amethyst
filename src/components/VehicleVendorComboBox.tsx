import {
	Autocomplete,
	TextField,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { FC } from "react";

type VehicleVendorComboBoxProps = {
	options: string[];
	value: string;
	onChange: (value: string) => void;
};
export const VehicleVendorComboBox: FC<
	VehicleVendorComboBoxProps
> = (props) => {
	const { onChange, options, value } = props;

	return (
		<Autocomplete
			freeSolo
			disableClearable
			disableListWrap
			disabledItemsFocusable
			fullWidth
			filterSelectedOptions
			getOptionLabel={(option) => option}
			options={options}
			value={value}
			onChange={(_, newValue) =>
				onChange(newValue)
			}
			renderInput={(params) => (
				<TextField {...params} />
			)}
			filterOptions={(options, state) =>
				state.inputValue
					.split(" ")
					.map((token) => token.trim())
					.filter((token) => token.length > 0)
					.reduceRight(
						(filteredOptions, token) =>
							matchSorter(filteredOptions, token),
						options,
					)
			}
		/>
	);
};
