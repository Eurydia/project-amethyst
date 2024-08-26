import {
	CloseRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Checkbox,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	TextField,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { FC, useMemo, useState } from "react";

type CustomToolbarProps = {
	search: string;
	onSearchChange: (value: string) => void;
};
const CustomToolbar: FC<CustomToolbarProps> = (
	props,
) => {
	const { search, onSearchChange } = props;

	const handleSearchChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		onSearchChange(e.target.value);
	};

	return (
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
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchRounded />
						</InputAdornment>
					),
				}}
				placeholder="ค้นหาหัวข้อ"
				value={search}
				onChange={handleSearchChange}
			/>
		</Toolbar>
	);
};

type CustomListItemProps = {
	isNew: boolean;
	isChecked: boolean;
	label: string;
	onToggle: () => void;
};
const CustomListItem: FC<CustomListItemProps> = (
	props,
) => {
	const { isNew, isChecked, label, onToggle } =
		props;

	return (
		<ListItem
			disableGutters
			disablePadding
			sx={{
				display: "inline",
				width: "auto",
			}}
		>
			<ListItemButton
				disableRipple
				onClick={onToggle}
			>
				<ListItemIcon>
					<Checkbox
						disableRipple
						checked={isChecked}
					/>
				</ListItemIcon>
				<ListItemText>
					<Typography>
						{isNew ? `${label} (ใหม่)` : label}
					</Typography>
				</ListItemText>
			</ListItemButton>
		</ListItem>
	);
};

type CustomListProps = {
	options: string[];
	registeredOptions: string[];
	selectedOptions: string[];
	toggleHandler: (option: string) => () => void;
};
const CustomList: FC<CustomListProps> = (
	props,
) => {
	const {
		options,
		registeredOptions,
		selectedOptions,
		toggleHandler,
	} = props;

	const renderedOptions = options.map(
		(option, index) => (
			<CustomListItem
				key={"option" + index}
				isNew={
					!registeredOptions.includes(option)
				}
				isChecked={selectedOptions.includes(
					option,
				)}
				label={option}
				onToggle={toggleHandler(option)}
			/>
		),
	);

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
				gap: 1,
			}}
		>
			{renderedOptions}
		</List>
	);
};

type TopicMultiSelectProps = {
	options: string[];
	value: string[];
	onChange: (value: string[]) => void;
};
export const TopicMultiSelect: FC<
	TopicMultiSelectProps
> = (props) => {
	const { options, value, onChange } = props;

	const [search, setSearch] = useState("");

	const toggleHandler =
		(option: string) => () => {
			if (!value.includes(option)) {
				onChange([...value, option]);
				return;
			}
			onChange(value.filter((v) => v !== option));
		};

	const filteredOptions = useMemo(() => {
		const targetOptions = new Set([
			...options,
			...value,
		]);

		const items = matchSorter(
			[...targetOptions],
			search,
		);
		if (
			items.length === 0 &&
			search.trim().normalize() !== ""
		) {
			items.push(search.trim().normalize());
		}
		return items;
	}, [search, options, value]);

	return (
		<Stack spacing={1}>
			<CustomToolbar
				search={search}
				onSearchChange={setSearch}
			/>
			<Alert
				severity="info"
				icon={false}
			>
				<Typography>
					Search for topics below, if the desired
					topic does not exist, it will create one
				</Typography>
			</Alert>
			<Typography
				sx={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					alignItems: "center",
					gap: 1,
				}}
			>
				เลือกแล้ว {value.length} หัวข้อ
				<Tooltip
					arrow
					title={
						<Typography>
							ยกเลิกหัวข้อทั้งหมด
						</Typography>
					}
				>
					<span>
						<IconButton
							size="small"
							disabled={value.length === 0}
							onClick={() => onChange([])}
						>
							<CloseRounded />
						</IconButton>
					</span>
				</Tooltip>
			</Typography>
			<CustomList
				options={filteredOptions}
				selectedOptions={value}
				registeredOptions={options}
				toggleHandler={toggleHandler}
			/>
		</Stack>
	);
};
