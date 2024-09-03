import { filterItems } from "$core/filter";
import { TRANSLATION } from "$locale/th";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleEntry } from "$types/models/Vehicle";
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
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITION: TableHeaderDefinition<VehicleEntry>[] =
	[
		{
			label: "เลขทะเบียน",
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
			label: TRANSLATION.vehicleTableRouteHeader,
			compare: null,
			render: (item) =>
				item.routes.length === 0 ? (
					<Typography>
						{TRANSLATION.globalNone}
					</Typography>
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
			label: TRANSLATION.vehicleTableDriverHeader,
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
			label: "ทะเบียนรถ",
			value: (
				<BaseInputMultiSelect
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
				tableBody: {
					emptyText: "ไม่พบข้อมูลรถรับส่ง",
				},
				searchField: {
					placeholder:
						"ค้นหาด้วยทะเบียนรถ, สายรถ, หรือชื่อและนามสกุลคนขับรถ",
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					children: "ลงทะเบียนรถรับส่ง",
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
