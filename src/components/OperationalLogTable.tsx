import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { OperationalLog } from "$types/models";
import {
	FilterAltRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
	alpha,
	Checkbox,
	Collapse,
	Grid,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TableContainer,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { Link } from "react-router-dom";
import { SortableTable } from "./SortableTable";
import { TypographyButton } from "./TypographyButton";

const objectToOptions = (
	obj: Record<string, string>,
): CustomListProps["options"] => {
	return Object.entries(obj).map(
		([value, label]) => ({
			value,
			label,
		}),
	);
};

const compareDates = (a: string, b: string) => {
	const dateA = dayjs(a);
	const dataB = dayjs(b);
	return dateA.unix() - dataB.unix();
};

const formatDate = (date: string) => {
	return dayjs(date).format("DD/MM/YYYY");
};

const HEADER_DEFINITION: TableHeaderDefinition<OperationalLog>[] =
	[
		{
			key: "start_date",
			label: "เริ่ม",
			compare: (a, b) =>
				compareDates(a.start_date, b.start_date),
			render: (item) => (
				<Typography>
					{formatDate(item.start_date)}
				</Typography>
			),
		},
		{
			key: "end_date",
			label: "สิ้นสุด",
			compare: (a, b) =>
				compareDates(a.end_date, b.end_date),
			render: (item) => (
				<Typography>
					{formatDate(item.end_date)}
				</Typography>
			),
		},
		{
			key: "driver_name",
			label: "คนขับรถ",
			compare: (a, b) =>
				a.driver_name.localeCompare(
					b.driver_name,
				),
			render: (item) => (
				<Typography
					component={Link}
					to={"/drivers/info/" + item.driver_id}
				>
					{item.driver_name} {item.driver_surname}
				</Typography>
			),
		},
		{
			key: "vehicle_license_plate",
			label: "ทะเบียนรถ",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={"/vehicles/info/" + item.vehicle_id}
				>
					{item.vehicle_license_plate}
				</Typography>
			),
		},
		{
			key: "route_name",
			label: "สายรถ",
			compare: (a, b) =>
				a.route_name.localeCompare(b.route_name),
			render: (item) => (
				<Typography
					component={Link}
					to={"/routes/info/" + item.route_id}
				>
					{item.route_name}
				</Typography>
			),
		},
	];

type CustomListItemProps = {
	label: string;
	onClick: () => void;
	isChecked?: boolean;
	isBold?: boolean;
	isDisabled?: boolean;
};
const CustomListItem: FC<CustomListItemProps> = (
	props,
) => {
	const {
		isDisabled,
		isBold,
		isChecked,
		onClick,
		label,
	} = props;
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
				disableGutters
				disabled={isDisabled}
				onClick={onClick}
			>
				<ListItemIcon>
					<Checkbox
						disableRipple
						disabled={isDisabled}
						checked={isChecked}
					/>
				</ListItemIcon>
				<ListItemText>
					<Typography
						fontWeight={
							isBold ? "bold" : undefined
						}
					>
						{label}
					</Typography>
				</ListItemText>
			</ListItemButton>
		</ListItem>
	);
};

type CustomListProps = {
	options: { label: string; value: string }[];
	selectedOptions: string[];
	onChange: (options: string[]) => void;
};
const CustomList: FC<CustomListProps> = (
	props,
) => {
	const { options, selectedOptions, onChange } =
		props;

	const toggleHandler = (value: string) => () => {
		if (!selectedOptions.includes(value)) {
			onChange([...selectedOptions, value]);
			return;
		}
		onChange(
			selectedOptions.filter(
				(selected) => selected !== value,
			),
		);
	};
	const renderedOptions = options.map(
		(option, index) => {
			const onToggle = toggleHandler(
				option.value,
			);
			const isChecked = selectedOptions.includes(
				option.value,
			);

			return (
				<CustomListItem
					key={"option" + index}
					isChecked={isChecked}
					onClick={onToggle}
					label={option.label}
				/>
			);
		},
	);

	const handleToggleAll = () => {
		if (isPartiallSelect) {
			onChange([]);
			return;
		}
		onChange(
			options.map((option) => option.value),
		);
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
				maxHeight: 250,
			}}
		>
			<CustomListItem
				onClick={handleToggleAll}
				label="ทั้งหมด"
				isBold
				isDisabled={options.length === 0}
				isChecked={isPartiallSelect}
			/>
			{renderedOptions}
		</List>
	);
};

type OperationalLogTableProps = {
	entries: OperationalLog[];
};
export const OperationalLogTable: FC<
	OperationalLogTableProps
> = (props) => {
	const { entries } = props;

	const {
		driverOptions,
		vehicleOptions,
		routeOptions,
	} = useMemo(() => {
		const uniqueDrivers: Record<string, string> =
			{};
		const uniqueVehicle: Record<string, string> =
			{};
		const uniqueRoute: Record<string, string> =
			{};
		for (const entry of entries) {
			uniqueDrivers[
				entry.driver_id
			] = `${entry.driver_name} ${entry.driver_surname}`;
			uniqueVehicle[entry.vehicle_id] =
				entry.vehicle_license_plate;
			uniqueRoute[entry.route_id] =
				entry.route_name;
		}

		const driverOptions = objectToOptions(
			uniqueDrivers,
		);
		const vehicleOptions = objectToOptions(
			uniqueVehicle,
		);
		const routeOptions =
			objectToOptions(uniqueRoute);
		return {
			driverOptions,
			vehicleOptions,
			routeOptions,
		};
	}, [entries]);

	const [filterOpen, setFilterOpen] =
		useState(false);

	const [search, setSearch] = useState("");
	const [afterDate, setAfterDate] =
		useState<Dayjs | null>(null);
	const [beforeDate, setBeforeDate] =
		useState<Dayjs | null>(null);

	const [selectedRoutes, setSelectedRoutes] =
		useState(
			routeOptions.map((option) => option.value),
		);
	const [selectedVehicles, setSelectedVehicles] =
		useState(
			vehicleOptions.map(
				(option) => option.value,
			),
		);
	const [selectedDrivers, setSelectedDrivers] =
		useState(
			driverOptions.map((option) => option.value),
		);

	const filteredEntries = useMemo(() => {
		let items = entries;
		if (afterDate !== null) {
			items = items.filter((entry) =>
				dayjs(entry.start_date).isAfter(
					afterDate,
				),
			);
		}
		if (beforeDate !== null) {
			items = items.filter((entry) =>
				dayjs(entry.start_date).isBefore(
					beforeDate,
				),
			);
		}
		items = items
			.filter((entry) =>
				selectedRoutes.includes(entry.route_id),
			)
			.filter((entry) =>
				selectedVehicles.includes(
					entry.vehicle_id,
				),
			)
			.filter((entry) =>
				selectedDrivers.includes(entry.driver_id),
			);
		return items;
	}, [
		entries,
		selectedDrivers,
		selectedRoutes,
		selectedRoutes,
		afterDate,
		beforeDate,
	]);

	const searchedEntries = useMemo(() => {
		const tokens = search
			.normalize()
			.split(" ")
			.map((token) => token.trim())
			.filter((token) => token.length > 0);

		return filterItems(filteredEntries, tokens, [
			"driver_name",
			"driver_surname",
			"vehicle_license_plate",
			"route_name",
		]);
	}, [search, filteredEntries]);

	const fitlerFormItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "หลังจากวันที่",
			value: (
				<DateField
					fullWidth
					format="DD/MM/YYYY"
					formatDensity="spacious"
					value={afterDate}
					onChange={setAfterDate}
				/>
			),
		},
		{
			label: "ก่อนจากวันที่",
			value: (
				<DateField
					fullWidth
					format="DD/MM/YYYY"
					formatDensity="spacious"
					value={beforeDate}
					onChange={setBeforeDate}
				/>
			),
		},
		{
			label: "สายรถ",
			value: (
				<CustomList
					options={routeOptions}
					selectedOptions={selectedRoutes}
					onChange={setSelectedRoutes}
				/>
			),
		},
		{
			label: "ทะเบียนรถ",
			value: (
				<CustomList
					options={vehicleOptions}
					selectedOptions={selectedVehicles}
					onChange={setSelectedVehicles}
				/>
			),
		},
		{
			label: "คนขับรถ",
			value: (
				<CustomList
					options={driverOptions}
					selectedOptions={selectedDrivers}
					onChange={setSelectedDrivers}
				/>
			),
		},
	];

	const renderedFilterFormItems =
		fitlerFormItems.map((item, index) => (
			<Grid
				item
				container
				key={"form-item" + index}
				paddingY={1}
				sx={{
					backgroundColor: (theme) =>
						alpha(
							index % 2 === 0
								? theme.palette.primary.main
								: theme.palette.common.white,
							0.05,
						),
				}}
			>
				<Grid
					item
					xs={12}
					md={3}
					display="flex"
					alignItems="center"
				>
					<Typography fontWeight="bold">
						{item.label}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					md={7}
				>
					{item.value}
				</Grid>
			</Grid>
		));

	return (
		<TableContainer>
			<TextField
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchRounded />
						</InputAdornment>
					),
				}}
				placeholder="ค้นหา"
				value={search}
				onChange={(e) =>
					setSearch(e.target.value)
				}
			/>
			<Toolbar
				variant="dense"
				disableGutters
				sx={{
					alignItems: "center",
					flexWrap: "wrap",
					justifyContent: "space-between",
					gap: 1,
				}}
			>
				<Typography>
					พบ {searchedEntries.length} รายการ
				</Typography>
				<TypographyButton
					variant="text"
					startIcon={<FilterAltRounded />}
					onClick={() =>
						setFilterOpen(!filterOpen)
					}
				>
					ตัวกรองขั้นสูง
				</TypographyButton>
			</Toolbar>
			<Collapse in={filterOpen}>
				<Grid container>
					{renderedFilterFormItems}
				</Grid>
			</Collapse>
			<SortableTable
				rows={searchedEntries}
				headers={HEADER_DEFINITION}
				defaultSortBy="start_date"
				defaultSortOrder="desc"
			/>
		</TableContainer>
	);
};
