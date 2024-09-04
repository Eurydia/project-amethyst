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
import {
	FC,
	HTMLAttributes,
	useEffect,
} from "react";

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
	{
		key,
		...props
	}: HTMLAttributes<HTMLLIElement> & {
		key: any;
	},
	option: PickupRouteModel,
) => (
	<ListItem
		key={key}
		{...props}
	>
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

type PickupRouteInputSelectProps = {
	isDisabled?: boolean;
	options: PickupRouteModel[];
	value: PickupRouteModel;
	onChange: (value: PickupRouteModel) => void;
};
export const PickupRouteInputSelect: FC<
	PickupRouteInputSelectProps
> = (props) => {
	const { options, value, onChange, isDisabled } =
		props;

	useEffect(() => {
		if (value === null && options.length > 0) {
			onChange(options[0]);
		}
	}, []);

	return (
		<Autocomplete
			disableClearable
			disableListWrap
			disablePortal
			disabled={isDisabled}
			onChange={(_, value) => {
				if (value === null) {
					return;
				}
				onChange(value);
			}}
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
