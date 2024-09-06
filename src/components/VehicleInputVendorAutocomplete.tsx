import { filterItems } from "$core/filter";
import {
	Autocomplete,
	FilterOptionsState,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import { FC } from "react";

const filterOptions = (
	options: string[],
	state: FilterOptionsState<string>,
) => {
	const items = filterItems(
		options,
		state.inputValue,
		undefined,
	);

	if (
		items.length === 0 &&
		state.inputValue.trim().length > 0
	) {
		items.push(state.inputValue.normalize());
	}
	return items;
};

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

	const optionSet = new Set(options);

	return (
		<Autocomplete
			freeSolo
			disableClearable
			fullWidth
			selectOnFocus
			clearOnBlur
			getOptionLabel={(option) => option}
			options={options}
			value={value}
			onChange={(_, newValue) =>
				onChange(newValue)
			}
			renderInput={(params) => (
				<TextField
					{...params}
					error={value.trim().length === 0}
					placeholder={
						placeholder.trim().length > 0
							? placeholder
							: "ค้นหา หรือลงเพิ่มหจก."
					}
				/>
			)}
			renderOption={(props, option) => (
				<ListItem {...props}>
					<ListItemText disableTypography>
						<Typography>
							{optionSet.has(option)
								? option
								: `เพิ่มหจก. "${option}"`}
						</Typography>
					</ListItemText>
				</ListItem>
			)}
			filterOptions={filterOptions}
		/>
	);
};
