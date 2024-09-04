import { BaseSortableTable } from "$components/BaseSortableTable";
import { filterItems } from "$core/filter";
import { TRANSLATION } from "$locale/th";
import { TableHeaderDefinition } from "$types/generics";
import { DriverEntry } from "$types/models/Driver";
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

const HEADER_DEFINITION: TableHeaderDefinition<DriverEntry>[] =
	[
		{
			label: "คนขับรถ",
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
			label: "สายรถ",
			compare: null,
			render: (item) =>
				item.routes.length === 0 ? (
					<Typography>
						{TRANSLATION.globalNone}
					</Typography>
				) : (
					<Stack spacing={1}>
						{item.routes.map((route, index) => (
							<Typography
								key={"route" + index}
								component={Link}
								to={
									"/pickup-routes/info/" +
									route.id
								}
							>
								{route.name}
							</Typography>
						))}
					</Stack>
				),
		},
		{
			label: "ทะเบียนรถ",
			compare: null,
			render: (item) =>
				item.vehicles.length === 0 ? (
					<Typography>ไม่มี</Typography>
				) : (
					<Stack spacing={1}>
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
	];

const toOptions = (entries: DriverEntry[]) => {
	const options: Record<string, string> = {};
	for (const entry of entries) {
		const value = `${entry.name} ${entry.surname}`;
		options[entry.id] = value;
	}
	return Object.entries(options).map(
		([value, label]) => ({
			value,
			label,
		}),
	);
};
export const filterEntries = (
	entries: DriverEntry[],
	selected: string[],
) => {
	const selectedSet = new Set(selected);
	return entries.filter((entry) =>
		selectedSet.has(entry.id.toString()),
	);
};
export const searchEntries = (
	entries: DriverEntry[],
	search: string,
) => {
	return filterItems(entries, search, [
		"name",
		"surname",
		"vehicles.*.licensePlate",
		"routes.*.name",
	]);
};

type DriverTableProps = {
	entries: DriverEntry[];
};
export const DriverTable: FC<DriverTableProps> = (
	props,
) => {
	const { entries } = props;
	const submit = useSubmit();
	const driverOptions = useMemo(
		() => toOptions(entries),
		[entries],
	);
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState(
		driverOptions.map(({ value }) => value),
	);
	const filteredEntries = useMemo(
		() => filterEntries(entries, selected),
		[entries, selected],
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
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					onChange={setSelected}
					options={driverOptions}
					selectedOptions={selected}
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
						"ค้นหาด้วยชื่อนามสกุลคนขับรถ, สายรถ, หรือทะเบียนรถ",
					value: search,
					onChange: setSearch,
				},
				addButton: {
					label: "ลงทะเบียน",
					onClick: () =>
						submit(
							{},
							{
								action: "/drivers/new",
							},
						),
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};
