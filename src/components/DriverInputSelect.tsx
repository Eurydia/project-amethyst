import { getDriverAll } from "$backend/database/get";
import { filterItems } from "$core/filter";
import { DriverModel } from "$types/models/Driver";
import { LockRounded } from "@mui/icons-material";
import {
	Autocomplete,
	AutocompleteRenderInputParams,
	FilterOptionsState,
	ListItem,
	ListItemText,
	TextField,
} from "@mui/material";
import {
	FC,
	HTMLAttributes,
	useEffect,
	useState,
} from "react";

const filterOptions = (
	options: DriverModel[],
	state: FilterOptionsState<DriverModel>,
) => {
	return filterItems(options, state.inputValue, [
		"name",
		"surname",
		"contact",
	]);
};

const renderOption = (
	props: HTMLAttributes<HTMLLIElement> & {
		key: any;
	},
	option: DriverModel,
) => {
	const { key, ...rest } = props;
	const contact =
		option.contact.trim().length > 0
			? `(${option.contact})`
			: "";
	return (
		<ListItem
			key={key}
			{...rest}
		>
			<ListItemText>
				{`${option.name} ${option.surname} ${contact}`}
			</ListItemText>
		</ListItem>
	);
};

const renderInput = (
	props: AutocompleteRenderInputParams,
) => (
	<TextField
		{...props}
		required
		placeholder="ค้นหาด้วยชื่อ, นามสกุล, หรือเบอร์ติดต่อ"
	/>
);

type DriverInputSelectProps = {
	isDisabled?: boolean;
	value: DriverModel;
	onChange: (value: DriverModel) => void;
};
export const DriverInputSelect: FC<
	DriverInputSelectProps
> = (props) => {
	const { value, onChange, isDisabled } = props;
	const [options, setOptions] = useState<
		readonly DriverModel[]
	>([]);

	useEffect(() => {
		(async () => {
			const drivers = await getDriverAll();
			setOptions(drivers);
		})();
	}, []);

	return (
		<Autocomplete
			disabled={isDisabled}
			popupIcon={
				isDisabled ? <LockRounded /> : undefined
			}
			disableClearable
			disableListWrap
			disablePortal
			noOptionsText="ไม่พบคนขับรถ"
			value={value}
			options={options}
			onChange={(_, value) => {
				if (value === null) {
					return;
				}
				onChange(value);
			}}
			groupBy={(option) => option.license_type}
			getOptionKey={(option) => option.id}
			getOptionLabel={(option) =>
				`${option.name} ${option.surname}`
			}
			renderOption={renderOption}
			filterOptions={filterOptions}
			renderInput={renderInput}
		/>
	);
};
