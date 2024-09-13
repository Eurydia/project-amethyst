import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleEntry } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";

const HEADER_DEFINITION: TableHeaderDefinition<VehicleEntry>[] =
	[
		{
			label: "ทะเบียนรถ",
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
					<Typography fontWeight="bold">
						ไม่มี
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
			label: "คนขับรถ",
			compare: null,
			render: ({ drivers }) =>
				drivers.length === 0 ? (
					<Typography fontWeight="bold">
						ไม่มี
					</Typography>
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

type VehicleTableProps = {
	entries: VehicleEntry[];
};
export const VehicleTable: FC<
	VehicleTableProps
> = (props) => {
	const { entries } = props;
	const submit = useSubmit();

	const [search, setSearch] = useState("");

	const filteredEntries = filterItems(
		entries,
		search,
		[
			"licensePlate",
			"routes.*.name",
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
							"ค้นหาด้วยทะเบียนรถ, สายรถ, หรือชื่อนามสกุลคนขับรถ",
						value: search,
						onChange: setSearch,
					},
					addButton: {
						label: "ลงทะเบียน",
						onClick: () =>
							submit(
								{},
								{
									action: "/vehicles/new",
								},
							),
					},
				}}
			/>
			<BaseSortableTable
				headers={HEADER_DEFINITION}
				defaultSortOrder="asc"
				defaultSortByColumn={0}
				entries={filteredEntries}
				slotProps={{
					body: {
						emptyText: "ไม่พบทะเบียนรถรับส่ง",
					},
				}}
			/>
		</Stack>
	);
};
