import { BaseMultiSelect } from "$components/BaseMultiSelect";
import { BaseSortableTable } from "$components/BaseSortableTable";
import { TableHeaderDefinition } from "$types/generics";
import { Typography, Stack } from "@mui/material";
import {
	FC,
	useMemo,
	useState,
	ReactNode,
} from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import {
	getRouteOptions,
	filterEntries,
	searchEntries,
} from "../helper";
import { IndexPageLoaderData } from "../loader";

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

type CustomTableProps = {
	entries: IndexPageLoaderData["entries"];
};
export const CustomTable: FC<CustomTableProps> = (
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
