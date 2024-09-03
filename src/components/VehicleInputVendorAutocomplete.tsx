import { filterItems } from "$core/filter";
import {
	Autocomplete,
	TextField,
} from "@mui/material";
import { FC, useEffect } from "react";

type VehicleInputVendorAutocompleteProps = {
	options: string[];
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
};
export const VehicleInputVendorAutocomplete: FC<
	VehicleInputVendorAutocompleteProps
> = (props) => {
	const {
		onChange,
		options,
		value,
		placeholder,
	} = props;

	useEffect(() => {
		if (value === "" && options.length > 0) {
			onChange(options[0]);
		}
	}, []);

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
				<TextField
					{...params}
					placeholder={
						placeholder.trim().length > 0
							? placeholder
							: "ค้นหา หรือลงเพิ่มหจก."
					}
				/>
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
