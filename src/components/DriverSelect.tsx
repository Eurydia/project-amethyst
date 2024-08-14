import {
	Autocomplete,
	TextField,
} from "@mui/material";
import { DriverModel } from "../types/models";
import { FC, SyntheticEvent } from "react";
import { filterItems } from "../core/filter";

type DriverSelectProps = {
	options: DriverModel[];
	value: DriverModel | null;
	onChange: (value: DriverModel | null) => void;
};
export const DriverSelect: FC<
	DriverSelectProps
> = (props) => {
	const { options, value, onChange } = props;

	const handleChange = (
		_: SyntheticEvent,
		value: DriverModel | null,
	) => {
		onChange(value);
	};

	return (
		<Autocomplete
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="คนขับ"
				/>
			)}
			onChange={handleChange}
			value={value}
			options={options}
			getOptionLabel={(option) =>
				`${option.name} ${option.surname}`
			}
			filterOptions={(options, params) =>
				filterItems(
					options,
					params.inputValue
						.normalize()
						.split(" "),
					["name", "surname"],
				)
			}
		/>
	);
};
