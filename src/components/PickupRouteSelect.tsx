import { PickupRouteModel } from "$types/models/PickupRoute";
import { LockRounded } from "@mui/icons-material";
import {
	Autocomplete,
	InputAdornment,
	TextField,
} from "@mui/material";
import { FC } from "react";
import { filterItems } from "../core/filter";

type PickupRouteSelectProps = {
	showError?: boolean;
	disabled?: boolean;
	options: PickupRouteModel[];
	value: PickupRouteModel | null;
	onChange: (
		value: PickupRouteModel | null,
	) => void;
};
export const PickupRouteSelect: FC<
	PickupRouteSelectProps
> = (props) => {
	const {
		options,
		value,
		onChange,
		showError,
		disabled,
	} = props;

	return (
		<Autocomplete
			disabled={disabled}
			onChange={(_, value) => onChange(value)}
			value={value}
			options={options}
			getOptionKey={(option) => option.id}
			getOptionLabel={(option) => option.name}
			filterOptions={(options, params) =>
				filterItems(
					options,
					params.inputValue
						.normalize()
						.split(" ")
						.map((token) => token.trim())
						.filter((token) => token.length > 0),
					["name"],
				)
			}
			renderInput={({ InputProps, ...rest }) => (
				<TextField
					{...rest}
					error={showError}
					placeholder="ค้นหาสายรถ"
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
