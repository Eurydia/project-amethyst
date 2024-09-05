import { getPickupRouteAll } from "$backend/database/get";
import { filterItems } from "$core/filter";
import { PickupRouteModel } from "$types/models/PickupRoute";
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
import dayjs from "dayjs";
import {
	FC,
	HTMLAttributes,
	useEffect,
	useState,
} from "react";

const filterOptions = (
	options: PickupRouteModel[],
	state: FilterOptionsState<PickupRouteModel>,
) => {
	return filterItems(options, state.inputValue, [
		"name",
	]);
};
const renderInput = (
	params: AutocompleteRenderInputParams,
) => (
	<TextField
		{...params}
		required
		placeholder="ค้นหาสายรถ"
	/>
);

const renderOption = (
	props: HTMLAttributes<HTMLLIElement> & {
		key: any;
	},
	option: PickupRouteModel,
) => {
	const { key, ...rest } = props;
	return (
		<ListItem
			key={key}
			{...rest}
		>
			<ListItemText disableTypography>
				<Typography>
					{`${option.name} (เข้า ${dayjs(
						option.arrival_time,
						"HH:mm",
					).format("HH:mm น.")}, ออก ${dayjs(
						option.departure_time,
						"HH:mm",
					).format("HH:mm น.")})`}
				</Typography>
			</ListItemText>
		</ListItem>
	);
};

type PickupRouteInputSelectProps = {
	isDisabled?: boolean;
	value: PickupRouteModel;
	onChange: (value: PickupRouteModel) => void;
};
export const PickupRouteInputSelect: FC<
	PickupRouteInputSelectProps
> = (props) => {
	const { value, onChange, isDisabled } = props;
	const [options, setOptions] = useState<
		PickupRouteModel[]
	>([]);

	useEffect(() => {
		(async () => {
			const routes = await getPickupRouteAll();
			setOptions(routes);
		})();
	}, []);

	return (
		<Autocomplete
			disableClearable
			disableListWrap
			disablePortal
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
