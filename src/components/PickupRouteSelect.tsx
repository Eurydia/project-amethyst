import {
	Autocomplete,
	TextField,
} from "@mui/material";
import { PickupRouteModel } from "../types/models";
import { FC, SyntheticEvent } from "react";
import { filterItems } from "../core/filter";

type PickupRouteSelectProps = {
	options: PickupRouteModel[];
	value: PickupRouteModel | null;
	onChange: (
		value: PickupRouteModel | null,
	) => void;
};
export const PickupRouteSelect: FC<
	PickupRouteSelectProps
> = (props) => {
	const { options, value, onChange } = props;

	const handleChange = (
		_: SyntheticEvent,
		value: PickupRouteModel | null,
	) => {
		onChange(value);
	};

	return (
		<Autocomplete
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="สายรถ"
				/>
			)}
			onChange={handleChange}
			value={value}
			options={options}
			getOptionLabel={(option) => option.name}
			filterOptions={(options, params) =>
				filterItems(
					options,
					params.inputValue
						.normalize()
						.split(" "),
					["name"],
				)
			}
		/>
	);
};
