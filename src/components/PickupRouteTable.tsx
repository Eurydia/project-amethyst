import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";

const HEADER_DEFINITION: TableHeaderDefinition<PickupRouteEntry>[] =
	[
		{
			label: "สายรถ",
			compare: (a, b) =>
				a.name.localeCompare(b.name),
			render: (item) => (
				<Typography
					component={Link}
					to={{
						pathname:
							"/pickup-routes/info/" + item.id,
					}}
				>
					{item.name}
				</Typography>
			),
		},
		{
			label: "ทะเบียนรถ",
			compare: null,
			render: (item) =>
				item.vehicles.length === 0 ? (
					<Typography fontWeight="bold">
						ไม่มี
					</Typography>
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
		{
			label: "คนขับรถ",
			compare: null,
			render: (item) =>
				item.drivers.length === 0 ? (
					<Typography fontWeight="bold">
						ไม่มี
					</Typography>
				) : (
					<Stack spacing={1}>
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

type PickupRouteTableProps = {
	entries: PickupRouteEntry[];
};
export const PickupRouteTable: FC<
	PickupRouteTableProps
> = (props) => {
	const { entries } = props;
	const submit = useSubmit();

	const [search, setSearch] = useState("");

	const filteredEntries = filterItems(
		entries,
		search,
		[
			"name",
			"vehicles.*.licensePlate",
			"drivers.*.name",
			"drivers.*.surname",
		],
	);

	return (
		<Stack spacing={1}>
			<BaseSortableTableToolbar
				slotProps={{
					searchField: {
						placeholder:
							"ค้นหาด้วยสายรถ, เลขทะเบียน, หรือชื่อสกุลคนขับรถ",
						value: search,
						onChange: setSearch,
					},
					addButton: {
						label: "เพิ่มสายรถ",
						onClick: () =>
							submit(
								{},
								{
									action: "/pickup-routes/new",
								},
							),
					},
				}}
			/>
			<BaseSortableTable
				defaultSortOrder="asc"
				defaultSortByColumn={0}
				headers={HEADER_DEFINITION}
				entries={filteredEntries}
				slotProps={{
					body: {
						emptyText: "ไม่พบสายรถ",
					},
				}}
			/>
		</Stack>
	);
};
