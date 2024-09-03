import { filterItems } from "$core/filter";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { LockRounded } from "@mui/icons-material";
import {
	Autocomplete,
	AutocompleteRenderInputParams,
	FilterOptionsState,
	InputAdornment,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, HTMLAttributes } from "react";

type PickupRouteSelectProps = {
	showError?: boolean;
	disabled?: boolean;
	options: PickupRouteModel[];
	value: PickupRouteModel | null;
	onChange: (
		value: PickupRouteModel | null,
	) => void;
};
const filterOptions = (
	options: PickupRouteModel[],
	state: FilterOptionsState<PickupRouteModel>,
) => {
	return filterItems(options, state.inputValue, [
		"name",
	]);
};
const renderInput = ({
	InputProps,
	disabled,
	...rest
}: AutocompleteRenderInputParams) => (
	<TextField
		{...rest}
		required
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
);

const renderOption = (
	props: HTMLAttributes<HTMLLIElement> & {
		key: any;
	},
	option: PickupRouteModel,
) => (
	<ListItem {...props}>
		<ListItemText disableTypography>
			<Typography>
				{`${option.name} (นำเข้า ${dayjs(
					option.arrival_time,
					"HH:mm",
				).format("HH:mm น.")}, นำออก ${dayjs(
					option.departure_time,
					"HH:mm",
				).format("HH:mm น.")})`}
			</Typography>
		</ListItemText>
	</ListItem>
);
export const PickupRouteSelect: FC<
	PickupRouteSelectProps
> = (props) => {
	const { options, value, onChange, disabled } =
		props;

	return (
		<Autocomplete
			disabled={disabled}
			onChange={(_, value) => onChange(value)}
			value={value}
			options={options}
			getOptionKey={(option) => option.id}
			getOptionLabel={(option) => option.name}
			renderOption={renderOption}
			filterOptions={filterOptions}
			renderInput={renderInput}
		/>
	);
};
