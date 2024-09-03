import { filterItems } from "$core/filter";
import { DriverModel } from "$types/models/Driver";
import { LockRounded } from "@mui/icons-material";
import {
	Autocomplete,
	AutocompleteRenderInputParams,
	FilterOptionsState,
	InputAdornment,
	ListItem,
	ListItemText,
	TextField,
} from "@mui/material";
import {
	FC,
	HTMLAttributes,
	useEffect,
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
	return (
		<ListItem {...props}>
			<ListItemText>
				{`${option.name} ${option.surname} (${option.contact})`}
			</ListItemText>
		</ListItem>
	);
};

const renderInput = ({
	InputProps,
	disabled,
	...rest
}: AutocompleteRenderInputParams) => (
	<TextField
		{...rest}
		required
		placeholder="ค้นหาด้วยชื่อ, นามสกุล, หรือเบอร์ติดต่อ"
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

type DriverInputSelectProps = {
	isDisabled?: boolean;
	options: DriverModel[];
	value: DriverModel | null;
	onChange: (value: DriverModel) => void;
};
export const DriverInputSelect: FC<
	DriverInputSelectProps
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
				`${option.name} ${option.surname}`
			}
			renderOption={renderOption}
			filterOptions={filterOptions}
			renderInput={renderInput}
		/>
	);
};
