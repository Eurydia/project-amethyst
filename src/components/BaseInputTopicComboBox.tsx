import { filterItems } from "$core/filter";
import {
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	TextField,
	Toolbar,
} from "@mui/material";
import { FC, useMemo, useState } from "react";

type CustomListItemProps = {
	label: string;
	isChecked?: boolean;
	onClick: () => void;
	isBold?: boolean;
};
const CustomListItem: FC<CustomListItemProps> = (
	props,
) => {
	const { isBold, isChecked, onClick, label } =
		props;
	return (
		<ListItem
			dense
			disableGutters
			disablePadding
			sx={{
				display: "inline",
				width: "auto",
			}}
		>
			<ListItemButton
				disableRipple
				onClick={onClick}
			>
				<ListItemIcon>
					<Checkbox
						disableRipple
						checked={isChecked}
					/>
				</ListItemIcon>
				<ListItemText
					primaryTypographyProps={{
						sx: {
							fontWeight: isBold
								? "bold"
								: undefined,
						},
					}}
				>
					{label}
				</ListItemText>
			</ListItemButton>
		</ListItem>
	);
};

type CustomListProps = {
	options: string[];
	registeredOptions: string[];
	selectedOptions: string[];
	onChange: (option: string[]) => void;
};
const CustomList: FC<CustomListProps> = (
	props,
) => {
	const {
		options,
		registeredOptions,
		selectedOptions,
		onChange,
	} = props;

	const toggleHandler =
		(option: string) => () => {
			if (!selectedOptions.includes(option)) {
				onChange([...selectedOptions, option]);
				return;
			}
			onChange(
				selectedOptions.filter(
					(selectOption) =>
						selectOption !== option,
				),
			);
		};

	const renderedOptions = options.map(
		(option, index) => {
			const isNew =
				!registeredOptions.includes(option);
			const handleToggle = toggleHandler(option);
			const isChecked =
				selectedOptions.includes(option);
			const label = isNew
				? `${option} (ใหม่)`
				: option;

			return (
				<CustomListItem
					key={"option" + index}
					onClick={handleToggle}
					label={label}
					isChecked={isChecked}
				/>
			);
		},
	);

	const handleToggleAll = () => {
		if (isPartiallySelect) {
			onChange([]);
			return;
		}
		const uniqueOptions = new Set([
			...options,
			...selectedOptions,
		]);
		onChange([...uniqueOptions]);
	};

	const isPartiallySelect =
		selectedOptions.length > 0;

	return (
		<List
			dense
			disablePadding
			sx={{
				maxHeight: 200,
				overflow: "auto",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			<CustomListItem
				label="เลือกทั้งหมด"
				onClick={handleToggleAll}
				isChecked={isPartiallySelect}
				isBold
			/>
			{renderedOptions}
		</List>
	);
};

const filterOptions = (
	options: string[],
	values: string[],
	search: string,
) => {
	const optionSet = new Set([
		...options,
		...values,
	]);

	const items = filterItems(
		[...optionSet],
		search,
		undefined,
	);
	if (
		items.length === 0 &&
		search.trim().normalize() !== ""
	) {
		items.push(search.trim().normalize());
	}
	return items;
};

type BaseInputTopicComboBoxProps = {
	options: string[];
	value: string[];
	onChange: (value: string[]) => void;
};
export const BaseInputTopicComboBox: FC<
	BaseInputTopicComboBoxProps
> = (props) => {
	const { options, value, onChange } = props;

	const [search, setSearch] = useState("");

	const filteredOptions = useMemo(
		() => filterOptions(options, value, search),
		[search, options, value],
	);

	return (
		<Stack spacing={1}>
			<Toolbar
				disableGutters
				variant="dense"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					gap: 1,
				}}
			>
				<TextField
					fullWidth
					placeholder="ค้นหา หรือเพิ่มหัว"
					value={search}
					onChange={(e) =>
						setSearch(e.target.value)
					}
				/>
			</Toolbar>
			<CustomList
				options={filteredOptions}
				selectedOptions={value}
				registeredOptions={options}
				onChange={onChange}
			/>
		</Stack>
	);
};
