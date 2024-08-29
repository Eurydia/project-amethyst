import { filterItems } from "$core/filter";
import { DriverReport } from "$types/models";
import { TableHeaderDefinition } from "$types/generics";
import {
	FilterAlt,
	SearchRounded,
} from "@mui/icons-material";
import {
	Checkbox,
	Collapse,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Radio,
	RadioGroup,
	Stack,
	TableContainer,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { SortableTable } from "./SortableTable";
import { TypographyButton } from "./TypographyButton";

type CustomListItemProps = {
	option: string;
	isChecked?: boolean;
	onClick: () => void;
	isBold?: boolean;
};
const CustomListItem: FC<CustomListItemProps> = (
	props,
) => {
	const { isBold, isChecked, onClick, option } =
		props;
	return (
		<ListItem
			disableGutters
			disablePadding
			dense
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
				<ListItemText>
					<Typography
						fontWeight={
							isBold ? "bold" : undefined
						}
					>
						{option}
					</Typography>
				</ListItemText>
			</ListItemButton>
		</ListItem>
	);
};

type CustomListProps = {
	options: string[];
	selectedOptions: string[];
	onChange: (options: string[]) => void;
};
const CustomList: FC<CustomListProps> = (
	props,
) => {
	const { options, selectedOptions, onChange } =
		props;

	const toggleHandler =
		(option: string) => () => {
			if (!selectedOptions.includes(option)) {
				onChange([...selectedOptions, option]);
				return;
			}
			onChange(
				selectedOptions.filter(
					(selected) => selected !== option,
				),
			);
		};
	const renderedOptions = options.map(
		(option, index) => {
			const onToggle = toggleHandler(option);
			const isChecked =
				selectedOptions.includes(option);

			return (
				<CustomListItem
					key={"option" + index}
					isChecked={isChecked}
					onClick={onToggle}
					option={option}
				/>
			);
		},
	);

	const handleToggleAll = () => {
		if (isPartiallSelect) {
			onChange([]);
			return;
		}
		onChange(options);
	};

	const isPartiallSelect =
		selectedOptions.length > 0;

	return (
		<List
			dense
			disablePadding
			sx={{
				overflow: "auto",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			<CustomListItem
				onClick={handleToggleAll}
				option="ทั้งหมด"
				isBold
				isChecked={isPartiallSelect}
			/>
			{renderedOptions}
		</List>
	);
};

type DriverReportTableProps = {
	topicOptions: string[];
	driverOptions: string[];
	headers: TableHeaderDefinition<DriverReport>[];
	searchPlaceholder?: string;
	entries: DriverReport[];
	defaultSortBy: keyof DriverReport;
	defaultSortOrder: "asc" | "desc";
};
export const DriverReportTable: FC<
	DriverReportTableProps
> = (props) => {
	const {
		headers,
		entries,
		defaultSortBy,
		defaultSortOrder,
		searchPlaceholder,
		driverOptions,
		topicOptions,
	} = props;

	const [search, setSearch] = useState("");
	const [filterOpen, setFilterOpen] =
		useState(false);

	const [selectedTopics, setSelectedTopics] =
		useState<string[]>(topicOptions);
	const [topicMustHaveAll, setTopicMustHaveAll] =
		useState("no");
	const [selectedDrivers, setSelectedDrivers] =
		useState<string[]>(driverOptions);

	const filteredEntries = useMemo(() => {
		const tokens = search
			.trim()
			.normalize()
			.split(" ")
			.map((token) => token.trim())
			.filter((token) => token.length > 0);

		const fromSelected = entries.filter(
			(entry) => {
				const driver = `${entry.driver_name} ${entry.driver_surname}`;
				const hasDriver =
					selectedDrivers.includes(driver);

				const hasTopic =
					topicMustHaveAll === "yes"
						? selectedTopics.every((topic) =>
								entry.topics.includes(topic),
						  )
						: selectedTopics.some((topic) =>
								entry.topics.includes(topic),
						  );

				return hasDriver && hasTopic;
			},
		);

		return filterItems(fromSelected, tokens, [
			"title",
			"topics",
			"driver_name",
			"driver_surname",
		]);
	}, [
		search,
		entries,
		selectedDrivers,
		topicMustHaveAll,
		selectedTopics,
	]);

	return (
		<TableContainer>
			<Toolbar
				disableGutters
				variant="dense"
				sx={{
					alignItems: "flex-start",
					flexWrap: "wrap",
				}}
			>
				<TextField
					fullWidth
					placeholder={searchPlaceholder}
					value={search}
					onChange={(e) =>
						setSearch(e.target.value)
					}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchRounded />
							</InputAdornment>
						),
					}}
				/>
				<Stack
					spacing={1}
					useFlexGap
					direction="row"
					justifyContent="space-between"
					alignItems="baseline"
					flexWrap="wrap"
					width="100%"
				>
					<Typography>
						พบ {filteredEntries.length} รายการ
					</Typography>
					<TypographyButton
						variant="text"
						startIcon={<FilterAlt />}
						onClick={() =>
							setFilterOpen(!filterOpen)
						}
					>
						ตัวกรองขั้นสูง
					</TypographyButton>
				</Stack>
			</Toolbar>
			<Collapse in={filterOpen}>
				<Typography>
					คนขับรถ (เลือกแล้ว{" "}
					{selectedDrivers.length} รายชื่อ)
				</Typography>
				<CustomList
					options={driverOptions}
					selectedOptions={selectedDrivers}
					onChange={setSelectedDrivers}
				/>
				<Divider flexItem />
				<FormControl>
					<FormLabel color="primary">
						ประเภทการค้นหาหัวข้อ
					</FormLabel>
					<RadioGroup
						row
						value={topicMustHaveAll}
						onChange={(e) =>
							setTopicMustHaveAll(e.target.value)
						}
					>
						<FormControlLabel
							value="yes"
							control={<Radio />}
							label="มีทุกหัวข้อที่เลือก"
						/>
						<FormControlLabel
							value="no"
							control={<Radio />}
							label="มีอย่างน้อยหนึ่งหัวข้อที่เลือก"
						/>
					</RadioGroup>
				</FormControl>
				<RadioGroup></RadioGroup>
				<Typography>
					หัวข้อ (เลือกแล้ว{" "}
					{selectedTopics.length} หัวข้อ)
				</Typography>
				<CustomList
					options={topicOptions}
					selectedOptions={selectedTopics}
					onChange={setSelectedTopics}
				/>
				<Divider flexItem />
			</Collapse>
			<SortableTable
				rows={filteredEntries}
				headers={headers}
				defaultSortBy={defaultSortBy}
				defaultSortOrder={defaultSortOrder}
			/>
		</TableContainer>
	);
};
