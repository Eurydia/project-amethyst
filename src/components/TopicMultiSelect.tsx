import {
	CloseRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
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
	Typography,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { FC, useMemo, useState } from "react";
import { TypographyAlert } from "./TypographyAlert";
import { TypographyTooltip } from "./TypographyTooltip";

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
		(option, index) => {
			const isNew =
				!registeredOptions.includes(option);
			const onToggle = toggleHandler(option);
			const isChecked =
				selectedOptions.includes(option);
			const label = isNew
				? `${option} (ใหม่)`
				: option;

			return (
				<ListItem
					key={"option" + index}
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
							<Typography>{label}</Typography>
						</ListItemText>
					</ListItemButton>
				</ListItem>
			);
		},
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
					onChange={(e) =>
						setSearch(e.target.value)
					}
				/>
			</Toolbar>
			<TypographyAlert severity="info">
				Search for topics below, if the desired
				topic does not exist, it will create one
			</TypographyAlert>
			<Stack
				direction="row"
				flexWrap="wrap"
				alignItems="center"
				spacing={1}
			>
				<Typography>
					เลือกแล้ว {value.length} หัวข้อ
				</Typography>
				<TypographyTooltip title="ยกเลิกหัวข้อที่เลือกแล้ว">
					<IconButton
						size="small"
						onClick={() => onChange([])}
					>
						<CloseRounded />
					</IconButton>
				</TypographyTooltip>
			</Stack>
			<CustomList
				options={filteredOptions}
				selectedOptions={value}
				registeredOptions={options}
				toggleHandler={toggleHandler}
			/>
		</Stack>
	);
};
