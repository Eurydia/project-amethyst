import { MultiSelect } from "$components/MultiSelect";
import { SortableTable } from "$components/SortableTable";
import { TypographyAlert } from "$components/TypographyAlert";
import { TypographyButton } from "$components/TypographyButton";
import { TypographyTooltip } from "$components/TypographyTooltip";
import { FormalLayout } from "$layouts/FormalLayout";
import { TableHeaderDefinition } from "$types/generics";
import {
	AddRounded,
	FilterAltRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
	Collapse,
	Fab,
	InputAdornment,
	Stack,
	TableContainer,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { filterItems } from "core/filter";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { DriverIndexPageLoaderData } from "./loader";

const HEADER_DEFINITION: TableHeaderDefinition<
	DriverIndexPageLoaderData["entries"][number]
>[] = [
	{
		key: "name",
		label: "ชื่อและนามสกุล",
		compare: (a, b) =>
			a.name.localeCompare(b.name),
		render: (item) => (
			<Typography
				component={Link}
				to={"/drivers/info/" + item.id}
			>
				{item.name} {item.surname}
			</Typography>
		),
	},
	{
		key: "routes",
		label: "สายรถ",
		compare: null,
		render: (item) =>
			item.routes.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack
					spacing={1}
					useFlexGap
				>
					{item.routes.map((route, index) => (
						<Typography
							key={"vehicle" + index}
							component={Link}
							to={
								"/pickup-routes/info/" + route.id
							}
						>
							{route.name}
						</Typography>
					))}
				</Stack>
			),
	},
	{
		key: "vehicles",
		label: "ทะเบียนรถ",
		compare: null,
		render: (item) =>
			item.vehicles.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack
					spacing={1}
					useFlexGap
				>
					{item.vehicles.map((vehicle, index) => (
						<Typography
							key={"vehicle" + index}
							component={Link}
							to={"/vehicles/info/" + vehicle.id}
						>
							{vehicle.licensePlate}
						</Typography>
					))}
				</Stack>
			),
	},
	{
		key: "contact",
		label: "เบอร์ติดต่อ",
		compare: null,
		render: (item) => (
			<Typography>{item.contact}</Typography>
		),
	},
];

const CustomFab: FC = () => {
	const submit = useSubmit();
	return (
		<TypographyTooltip
			title="ลงทะเบียนคนขับรถ"
			placement="left"
		>
			<Fab
				sx={{
					position: "fixed",
					bottom: 72,
					right: 16,
				}}
				color="primary"
				size="medium"
				onClick={() =>
					submit(
						{},
						{
							action: "/drivers/new",
						},
					)
				}
			>
				<AddRounded />
			</Fab>
		</TypographyTooltip>
	);
};

type CustomTableProps = {
	entries: DriverIndexPageLoaderData["entries"];
};
const CustomTable: FC<CustomTableProps> = (
	props,
) => {
	const { entries } = props;

	const {
		driverOptions,
		vehicleOptions,
		routeOptions,
	} = useMemo(() => {
		const uniqueDrivers: Record<string, string> =
			{};
		const uniqueRoutes: Record<string, string> =
			{};
		const uniqueVehicles: Record<string, string> =
			{};

		for (const entry of entries) {
			uniqueDrivers[
				entry.id
			] = `${entry.name} ${entry.surname}`;

			for (const route of entry.routes) {
				uniqueRoutes[route.id] = route.name;
			}
			for (const vehicle of entry.vehicles) {
				uniqueVehicles[vehicle.id] =
					vehicle.licensePlate;
			}
		}

		const driverOptions = Object.entries(
			uniqueDrivers,
		).map(([value, label]) => ({
			value,
			label,
		}));

		const routeOptions = Object.entries(
			uniqueRoutes,
		).map(([value, label]) => ({
			value,
			label,
		}));

		const vehicleOptions = Object.entries(
			uniqueVehicles,
		).map(([value, label]) => ({
			value,
			label,
		}));
		return {
			driverOptions,
			routeOptions,
			vehicleOptions,
		};
	}, [entries]);

	const [search, setSearch] = useState("");

	const [filterOpen, setFilterOpen] =
		useState(false);
	const [selectedDrivers, setSelectedDrivers] =
		useState(
			driverOptions.map(({ value }) => value),
		);
	const [selectedRoutes, setSelectedRoutes] =
		useState(
			routeOptions.map(({ value }) => value),
		);
	const [selectedVehicles, setSelectedVehicles] =
		useState(
			vehicleOptions.map(({ value }) => value),
		);

	const filteredEntries = useMemo(() => {
		const driverSet = new Set(selectedDrivers);
		const routeSet = new Set(selectedRoutes);
		const vehicleSet = new Set(selectedVehicles);

		return entries
			.filter((item) => driverSet.has(item.id))
			.filter((item) =>
				item.vehicles
					.map(({ id }) => id)
					.some((id) => vehicleSet.has(id)),
			)
			.filter((item) =>
				item.routes
					.map(({ id }) => id)
					.some((id) => routeSet.has(id)),
			);
	}, [
		entries,
		selectedDrivers,
		selectedRoutes,
		selectedVehicles,
	]);

	const searchedEntries = useMemo(() => {
		const tokens = search
			.normalize()
			.split(" ")
			.map((token) => token.trim())
			.filter((token) => token.length > 0);
		return filterItems(filteredEntries, tokens, [
			"name",
			"surname",
			"contact",
			"vehicles.*.licensePlate",
			"routes.*.name",
		]);
	}, [filteredEntries, search]);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "คนขับรถ",
			value: (
				<MultiSelect
					onChange={setSelectedDrivers}
					options={driverOptions}
					selectedOptions={selectedDrivers}
				/>
			),
		},
		// {
		// 	label: "สายรถ",
		// 	value: (
		// 		<MultiSelect
		// 			options={routeOptions}
		// 			onChange={setSelectedRoutes}
		// 			selectedOptions={selectedRoutes}
		// 		/>
		// 	),
		// },
		// {
		// 	label: "ทะเบียนรถ",
		// 	value: (
		// 		<MultiSelect
		// 			options={vehicleOptions}
		// 			onChange={setSelectedVehicles}
		// 			selectedOptions={selectedVehicles}
		// 		/>
		// 	),
		// },
	];

	return (
		<TableContainer>
			<TextField
				fullWidth
				placeholder="ค้นหา"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchRounded />
						</InputAdornment>
					),
				}}
				value={search}
				onChange={(e) =>
					setSearch(e.target.value)
				}
			/>
			<Toolbar
				variant="dense"
				disableGutters
				sx={{
					flexDirection: "row",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 1,
				}}
			>
				<Typography>
					พบ {searchedEntries.length} รายการ
				</Typography>
				<TypographyButton
					startIcon={<FilterAltRounded />}
					variant="text"
					onClick={() =>
						setFilterOpen(!filterOpen)
					}
				>
					ตัวกรองขั้นสูง
				</TypographyButton>
			</Toolbar>
			<Collapse in={filterOpen}>
				<FormalLayout>{formItems}</FormalLayout>
			</Collapse>
			<SortableTable
				headers={HEADER_DEFINITION}
				defaultSortOrder="asc"
				defaultSortBy="name"
				rows={searchedEntries}
			/>
		</TableContainer>
	);
};

export const DriverIndexPage: FC = () => {
	const { entries } =
		useLoaderData() as DriverIndexPageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				รายชื่อคนขับรถ
			</Typography>
			<TypographyAlert severity="info">
				TBA
			</TypographyAlert>
			<CustomFab />
			<CustomTable entries={entries} />
		</Stack>
	);
};
