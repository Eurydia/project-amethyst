import {
	Autocomplete,
	TextField,
} from "@mui/material";
import { VehicleModel } from "../types/models";
import { FC, SyntheticEvent } from "react";
import { filterItems } from "../core/filter";

type VehicleSelectProps = {
	options: VehicleModel[];
	value: VehicleModel | null;
	onChange: (value: VehicleModel | null) => void;
};
export const VehicleSelect: FC<
	VehicleSelectProps
> = (props) => {
	const { options, value, onChange } = props;

	const handleChange = (
		_: SyntheticEvent,
		value: VehicleModel | null,
	) => {
		onChange(value);
	};

	return (
		<Autocomplete
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="ทะเบียนรถ"
				/>
			)}
			onChange={handleChange}
			value={value}
			options={options}
			isOptionEqualToValue={(option, value) =>
				option.id === value.id
			}
			getOptionLabel={(option) =>
				`${option.license_plate} (${option.vendor})`
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
