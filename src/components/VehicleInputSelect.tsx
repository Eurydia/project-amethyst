import { getVehicleAll } from "$backend/database/get";
import { filterItems } from "$core/filter";
import { VehicleModel } from "$types/models/Vehicle";
import { LockRounded } from "@mui/icons-material";
import {
	Autocomplete,
	AutocompleteRenderInputParams,
	FilterOptionsState,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import {
	FC,
	HTMLAttributes,
	useEffect,
	useState,
} from "react";

const filterOptions = (
	options: VehicleModel[],
	state: FilterOptionsState<VehicleModel>,
) =>
	filterItems(options, state.inputValue, [
		"vendor",
		"license_plate",
		"registered_city",
	]);

const renderInput = (
	params: AutocompleteRenderInputParams,
) => {
	return (
		<TextField
			{...params}
			required
			placeholder="ค้นหาด้วยเลขทะเบียน, หจก., หรือจังหวัดที่จดทะเบียน"
		/>
	);
};

const renderOption = (
	props: HTMLAttributes<HTMLLIElement> & {
		key: any;
	},
	option: VehicleModel,
) => {
	const { key, ...rest } = props;
	return (
		<ListItem
			key={key}
			{...rest}
		>
			<ListItemText disableTypography>
				<Typography>
					{`${option.license_plate} (${option.vendor})`}
				</Typography>
			</ListItemText>
		</ListItem>
	);
};
type VehicleInputSelectProps = {
	isDisabled?: boolean;
	value: VehicleModel;
	onChange: (value: VehicleModel) => void;
};
export const VehicleInputSelect: FC<
	VehicleInputSelectProps
> = (props) => {
	const { isDisabled, value, onChange } = props;
	const [options, setOptions] = useState<
		VehicleModel[]
	>([]);
	useEffect(() => {
		(async () => {
			const vehicles = await getVehicleAll();
			setOptions(vehicles);
		})();
	}, []);

	return (
		<Autocomplete
			disabled={isDisabled}
			popupIcon={
				isDisabled ? <LockRounded /> : undefined
			}
			onChange={(_, value) => {
				if (value === null) {
					return;
				}
				onChange(value);
			}}
			disableClearable
			disableListWrap
			disablePortal
			noOptionsText="ไม่พบรถรับส่ง"
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
