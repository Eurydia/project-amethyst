import { BaseSortableTable } from "$components/BaseSortableTable";
import { filterItems } from "$core/filter";
import { TRANSLATION } from "$locale/th";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteEntry } from "$types/models/PickupRoute";
import { Stack, Typography } from "@mui/material";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";

const HEADER_DEFINITION: TableHeaderDefinition<PickupRouteEntry>[] =
	[
		{
			label: "ชื่อสาย",
			compare: (a, b) =>
				a.name.localeCompare(b.name),
			render: (item) => (
				<Typography
					component={Link}
					to={"/pickup-routes/info/" + item.id}
				>
					{item.name}
				</Typography>
			),
		},
		{
			label: "เลขทะเบียน",
			compare: null,
			render: (item) =>
				item.vehicles.length === 0 ? (
					<Typography>
						{TRANSLATION.globalNone}
					</Typography>
				) : (
					<Stack
						spacing={1}
						useFlexGap
					>
						{item.vehicles.map(
							(vehicle, index) => (
								<Typography
									key={"vehicle" + index}
									component={Link}
									to={
										"/vehicles/info/" + vehicle.id
									}
								>
									{vehicle.licensePlate}
								</Typography>
							),
						)}
					</Stack>
				),
		},
		{
			label: "คนขับรถ",
			compare: null,
			render: (item) =>
				item.drivers.length === 0 ? (
					<Typography>
						{TRANSLATION.globalNone}
					</Typography>
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

const toOptions = (
	entries: PickupRouteEntry[],
) => {
	const options: Record<string, string> = {};
	for (const entry of entries) {
		options[entry.id] = entry.name;
	}
	return Object.entries(options).map(
		([value, label]) => ({
			value,
			label,
		}),
	);
};
export const filterEntries = (
	entries: PickupRouteEntry[],
	selected: string[],
) => {
	const selectedSet = new Set(selected);
	return entries.filter((entry) =>
		selectedSet.has(entry.id),
	);
};
export const searchEntries = (
	entries: PickupRouteEntry[],
	search: string,
) => {
	return filterItems(entries, search, [
		"name",
		"vehicles.*.licensePlate",
		"drivers.*.name",
		"drivers.*.surname",
	]);
};

type PickupRouteTableProps = {
	entries: PickupRouteEntry[];
};
export const PickupRouteTable: FC<
	PickupRouteTableProps
> = (props) => {
	const { entries } = props;
	const submit = useSubmit();
	const routeOptions = useMemo(
		() => toOptions(entries),
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
			label: TRANSLATION.pickupRouteName,
			value: (
				<BaseInputMultiSelect
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
				tableBody: {
					emptyText: "ไม่พบข้อมูลสายรถ",
				},
				searchField: {
					placeholder:
						TRANSLATION.pickupRouteTableSearch,
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					children: TRANSLATION.pickupRoutePost,
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
