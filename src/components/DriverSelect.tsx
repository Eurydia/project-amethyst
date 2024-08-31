import { LockRounded } from "@mui/icons-material";
import {
	Autocomplete,
	InputAdornment,
	TextField,
} from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { filterItems } from "../core/filter";
import { DriverModel } from "../types/models";

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
						.split(" ")
						.map((token) => token.trim())
						.filter((token) => token.length > 0),
					["name", "surname"],
				)
			}
			renderInput={({ InputProps, ...rest }) => (
				<TextField
					{...rest}
					error={showError}
					placeholder="ค้นหาคนขับ"
					slotProps={{
						input: {
							...InputProps,
							endAdornment: (
								<InputAdornment position="end">
									{disabled ? (
										<LockRounded />
									) : (
										InputProps.endAdornment
									)}
								</InputAdornment>
							),
						},
					}}
				/>
			)}
		/>
	);
};
