import { filterItems } from "$core/filter";
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
import { BaseMultiSelect } from "./BaseMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";
import { VehicleEntry } from "$types/models/Vehicle";

const HEADER_DEFINITION: TableHeaderDefinition<VehicleEntry>[] =
	[
		{
			label: "เลขทะเบียนรถ",
			compare: null,
			render: ({ id, licensePlate }) => (
				<Typography
					component={Link}
					to={"/vehicles/info/" + id}
				>
					{licensePlate}
				</Typography>
			),
		},
		{
			label: "สายรถ",
			compare: null,
			render: (item) =>
				item.routes.length === 0 ? (
					<Typography>ไม่มี</Typography>
				) : (
					<Stack spacing={1}>
						{item.routes.map(
							({ id, name }, index) => (
								<Typography
									key={"route" + index}
									component={Link}
									to={"/pickup-routes/info/" + id}
								>
									{name}
								</Typography>
							),
						)}
					</Stack>
				),
		},
		{
			label: "คนขับรถ",
			compare: null,
			render: ({ drivers }) =>
				drivers.length === 0 ? (
					<Typography>ไม่มี</Typography>
				) : (
					<Stack spacing={1}>
						{drivers.map(
							({ id, name, surname }, index) => (
								<Typography
									key={"driver" + index}
									component={Link}
									to={"/drivers/info/" + id}
								>
									{name} {surname}
								</Typography>
							),
						)}
					</Stack>
				),
		},
	];

const toOptions = (entries: VehicleEntry[]) => {
	const options = entries.map(
		({ id, licensePlate }) => ({
			value: id,
			label: licensePlate,
		}),
	);

	return options;
};

const filterEntries = (
	entries: VehicleEntry[],
	selectedVehicles: string[],
) => {
	const vehicleSet = new Set(selectedVehicles);
	return entries.filter((entry) =>
		vehicleSet.has(entry.id),
	);
};

const searchEntries = (
	entries: VehicleEntry[],
	search: string,
) => {
	return filterItems(entries, search, [
		"licensePlate",
		"routes.*.name",
		"drivers.*.name",
		"drivers.*.surname",
	]);
};

type VehicleTableProps = {
	entries: VehicleEntry[];
};
export const VehicleTable: FC<
	VehicleTableProps
> = (props) => {
	const { entries } = props;
	const submit = useSubmit();

	const vehicleOptions = useMemo(
		() => toOptions(entries),
		[entries],
	);

	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState(
		vehicleOptions.map(({ value }) => value),
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
			label: "เลขทะเบียนรถ",
			value: (
				<BaseMultiSelect
					onChange={setSelected}
					options={vehicleOptions}
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
						"ค้นหาด้วยทะเบียนรถ, สายรถ, หรือชื่อนามสกุลคนขับรถ",
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					children: "ลงทะเบียนรถ",
					onClick: () =>
						submit(
							{},
							{
								action: "/vehicles/new",
							},
						),
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};
