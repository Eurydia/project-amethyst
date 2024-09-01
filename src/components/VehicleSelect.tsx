import { VehicleModel } from "$types/models/Vehicle";
import {
	Autocomplete,
	InputAdornment,
	TextField,
} from "@mui/material";
import { FC, useEffect } from "react";
import { filterItems } from "../core/filter";
import { LockRounded } from "@mui/icons-material";

type VehicleSelectProps = {
	isError?: boolean;
	isDisabled?: boolean;
	options: VehicleModel[];
	value: VehicleModel | null;
	onChange: (value: VehicleModel) => void;
};
export const VehicleSelect: FC<
	VehicleSelectProps
> = (props) => {
	const {
		options,
		isDisabled,
		isError,
		value,
		onChange,
	} = props;

	useEffect(() => {
		if (value === null && options.length > 0) {
			onChange(options[0]);
		}
		return () => {};
	}, []);

	return (
		<Autocomplete
			disableClearable
			disabled={isDisabled}
			renderInput={({
				InputProps,
				...params
			}) => (
				<TextField
					{...params}
					placeholder="ทะเบียนรถ"
					error={isError}
					slotProps={{
						input: {
							...InputProps,
							endAdornment: isDisabled ? (
								<InputAdornment position="end">
									<LockRounded />
								</InputAdornment>
							) : (
								InputProps.endAdornment
							),
						},
					}}
				/>
			)}
			onChange={(_, value) => onChange(value)}
			value={value ?? undefined}
			options={options}
			isOptionEqualToValue={(option, value) =>
				option.id === value.id
			}
			getOptionLabel={({ license_plate }) =>
				license_plate
			}
			filterOptions={(options, params) =>
				filterItems(
					options,
					params.inputValue
						.normalize()
						.split(" "),
					["vendor", "license_plate"],
				)
			}
		/>
	);
};
