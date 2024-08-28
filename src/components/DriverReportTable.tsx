import { filterItems } from "$core/filter";
import { DriverReport } from "$types/form-data";
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
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SortableTable } from "./SortableTable";
import { TypographyButton } from "./TypographyButton";

const TABLE_HEADERS: TableHeaderDefinition<DriverReport>[] =
	[
		{
			key: "datetime_iso",
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime_iso).unix() -
				dayjs(b.datetime_iso).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime_iso)
						.locale("th")
						.format("HH:mm น. DD/MM/YYYY")}
				</Typography>
			),
		},
		{
			key: "driver_name",
			label: "ชื่อ-นามสกุล",
			compare: (a, b) =>
				a.driver_name.localeCompare(
					b.driver_name,
				),
			render: (item) => (
				<Typography
					sx={{
						textDecoration: "underline",
						textDecorationStyle: "wavy",
						textDecorationThickness: "from-font",
						cursor: "pointer",
					}}
					onClick={() => {
						window.navigator.clipboard.writeText(
							`${item.driver_name} ${item.driver_surname}`,
						);
						toast.info(
							"คัดลอกชื่อและนามสกุลแล้ว",
						);
					}}
				>
					{item.driver_name} {item.driver_surname}
				</Typography>
			),
		},
		{
			key: "title",
			label: "เรื่อง",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={"./info/" + item.id}
				>
					{item.title}
				</Typography>
			),
		},
		{
			key: "topics",
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) => (
				<Typography>
					{item.topics.join(", ")}
				</Typography>
			),
		},
	];

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
							<Typography>{option}</Typography>
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
				overflow: "auto",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			{renderedOptions}
		</List>
	);
};

type DriverReportTableProps = {
	searchPlaceholder?: string;
	driverOptions: string[];
	topicOptions: string[];
	entries: DriverReport[];
	defaultSortBy: keyof DriverReport;
	defaultSortOrder: "asc" | "desc";
};
export const DriverReportTable: FC<
	DriverReportTableProps
> = (props) => {
	const {
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
		<TableContainer
			sx={{
				minHeight: 550,
			}}
		>
			<Toolbar
				disableGutters
				variant="dense"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					flexWrap: "wrap",
					gap: 1,
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
					alignItems="center"
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
				<Collapse in={filterOpen}>
					<Typography>คนขับรถ</Typography>
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
								setTopicMustHaveAll(
									e.target.value,
								)
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
					<Typography>หัวข้อ</Typography>
					<CustomList
						options={topicOptions}
						selectedOptions={selectedTopics}
						onChange={setSelectedTopics}
					/>
					<Divider flexItem />
				</Collapse>
			</Toolbar>
			<SortableTable
				rows={filteredEntries}
				headers={TABLE_HEADERS}
				defaultSortBy={defaultSortBy}
				defaultSortOrder={defaultSortOrder}
			/>
		</TableContainer>
	);
};
