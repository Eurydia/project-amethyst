import { filterItems } from "$core/filter";
import {
	Autocomplete,
	TextField,
} from "@mui/material";
import { FC } from "react";

type VehicleInputVendorAutocompleteProps = {
	options: string[];
	value: string;
	onChange: (value: string) => void;
};
export const VehicleInputVendorAutocomplete: FC<
	VehicleInputVendorAutocompleteProps
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
				filterItems(
					options,
					state.inputValue,
					undefined,
				)
			}
		/>
	);
};
