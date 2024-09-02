import { BaseSortableTable } from "$components/BaseSortableTable";
import { TableHeaderDefinition } from "$types/generics";
import { Stack, Typography } from "@mui/material";
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
import { IndexPageLoaderData } from "./loader";
import { BaseMultiSelect } from "$components/BaseMultiSelect";

const HEADER_DEFINITION: TableHeaderDefinition<
	IndexPageLoaderData["entries"][number]
>[] = [
	{
		label: "สายรถ",
		compare: (a, b) =>
			a.route.name.localeCompare(b.route.name),
		render: (item) => (
			<Typography
				component={Link}
				to={
					"/pickup-routes/info/" + item.route.id
				}
			>
				{item.route.name}
			</Typography>
		),
	},
	{
		label: "เลขทะเบียนรถ",
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
		label: "คนขับรถ",
		compare: null,
		render: (item) =>
			item.drivers.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack
					spacing={1}
					useFlexGap
				>
					{item.drivers.map((driver, index) => (
						<Typography
							key={"driver" + index}
							component={Link}
							to={"/drivers/info/" + driver.id}
						>
							{driver.name} {driver.surname}
						</Typography>
					))}
				</Stack>
			),
	},
];

const getRouteOptions = (
	entries: IndexPageLoaderData["entries"],
) => {
	const uniqueRoutes: Record<string, string> = {};
	for (const entry of entries) {
		uniqueRoutes[entry.route.id] =
			entry.route.name;
	}
	const routeOptions = Object.entries(
		uniqueRoutes,
	).map(([value, label]) => ({
		label,
		value,
	}));
	return routeOptions;
};

const filterEntries = (
	entries: IndexPageLoaderData["entries"],
	selectedRoutes: string[],
) => {
	const routeSet = new Set(selectedRoutes);
	return entries.filter((entry) =>
		routeSet.has(entry.route.id),
	);
};

const searchEntries = (
	entries: IndexPageLoaderData["entries"],
	search: string,
) => {
	return filterItems(entries, search, [
		"route.name",
		"vehicles.*.licensePlate",
		"drivers.*.name",
		"drivers.*.surname",
	]);
};

type CustomTableProps = {
	entries: IndexPageLoaderData["entries"];
};
const CustomTable: FC<CustomTableProps> = (
	props,
) => {
	const { entries } = props;
	const submit = useSubmit();
	const routeOptions = useMemo(
		() => getRouteOptions(entries),
		[entries],
	);
	const [search, setSearch] = useState("");
	const [selectedRoutes, setSelectedRoutes] =
		useState(
			routeOptions.map(({ value }) => value),
		);
	const filteredEntries = useMemo(
		() => filterEntries(entries, selectedRoutes),
		[entries, selectedRoutes],
	);
	const searchedEntries = useMemo(
		() => searchEntries(filteredEntries, search),
		[filteredEntries, search],
	);
	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "สายรถ",
			value: (
				<BaseMultiSelect
					onChange={setSelectedRoutes}
					options={routeOptions}
					selectedOptions={selectedRoutes}
				/>
			),
		},
	];
	return (
		<BaseSortableTable
			headers={HEADER_DEFINITION}
			defaultSortOrder="asc"
			defaultSortByColumn={0}
			entries={searchedEntries}
			slotProps={{
				searchField: {
					placeholder:
						"ค้นหาด้วยสายรถ, ทะเบียนรถ, หรือชื่อนามสกุลคนขับรถ",
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					children: "ลงทะเบียนสายรถ",
					onClick: () =>
						submit(
							{},
							{
								action: "/pickup-routes/new",
							},
						),
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				รายชื่อสายรถ
			</Typography>
			<CustomTable entries={entries} />
		</Stack>
	);
};
