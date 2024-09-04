import { VehicleModel } from "$types/models/Vehicle";
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
import {
	FC,
	HTMLAttributes,
	useEffect,
} from "react";
import { filterItems } from "../core/filter";

const filterOptions = (
	options: VehicleModel[],
	state: FilterOptionsState<VehicleModel>,
) =>
	filterItems(options, state.inputValue, [
		"vendor",
		"license_plate",
		"registered_city",
	]);

const renderInput = ({
	InputProps,
	disabled,
	...params
}: AutocompleteRenderInputParams) => (
	<TextField
		{...params}
		placeholder="ค้นหาด้วยเลขทะเบียน, หจก., หรือจังหวัดที่จะทะเบียน"
		required
		slotProps={{
			input: {
				...InputProps,
				endAdornment: disabled ? (
					<InputAdornment position="end">
						<LockRounded />
					</InputAdornment>
				) : (
					InputProps.endAdornment
				),
			},
		}}
	/>
);

const renderOption = (
	props: HTMLAttributes<HTMLLIElement> & {
		key: any;
	},
	option: VehicleModel,
) => (
	<ListItem {...props}>
		<ListItemText disableTypography>
			<Typography>
				{`${option.license_plate} (${option.vendor})`}
			</Typography>
		</ListItemText>
	</ListItem>
);
type VehicleInputSelectProps = {
	isDisabled?: boolean;
	options: VehicleModel[];
	value: VehicleModel | null;
	onChange: (value: VehicleModel) => void;
};
export const VehicleInputSelect: FC<
	VehicleInputSelectProps
> = (props) => {
	const { options, isDisabled, value, onChange } =
		props;

	useEffect(() => {
		if (value === null && options.length > 0) {
			onChange(options[0]);
		}
		return () => {};
	}, []);

	return (
		<Autocomplete
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
			getOptionLabel={(option) =>
				option.license_plate
			}
			renderInput={renderInput}
			filterOptions={filterOptions}
			renderOption={renderOption}
		/>
	);
};
