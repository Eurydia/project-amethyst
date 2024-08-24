import {
	Autocomplete,
	InputAdornment,
	TextField,
} from "@mui/material";
import { DriverModel } from "../types/models";
import { FC, SyntheticEvent } from "react";
import { filterItems } from "../core/filter";
import {
	LockRounded,
	PersonRounded,
} from "@mui/icons-material";

type DriverSelectProps = {
	showError?: boolean;
	options: DriverModel[];
	value: DriverModel | null;
	onChange: (value: DriverModel | null) => void;
	disabled?: boolean;
};
export const DriverSelect: FC<
	DriverSelectProps
> = (props) => {
	const {
		options,
		value,
		onChange,
		showError,
		disabled,
	} = props;

	const handleChange = (
		_: SyntheticEvent,
		value: DriverModel | null,
	) => {
		onChange(value);
	};

	return (
		<Autocomplete
			disabled={disabled}
			renderInput={({ InputProps, ...rest }) => (
				<TextField
					{...rest}
					InputProps={{
						...InputProps,
						startAdornment: (
							<InputAdornment position="start">
								<PersonRounded />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								{disabled ? (
									<LockRounded />
								) : (
									InputProps.endAdornment
								)}
							</InputAdornment>
						),
					}}
					error={showError}
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
