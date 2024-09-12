import { BaseSortableTable } from "$components/BaseSortableTable";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverEntry } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
	createSearchParams,
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";

const CURR_ROUTE_SEARCH_PARAM =
	createSearchParams({
		previousPath: "/drivers",
		previousPathLabel: `รายชื่อคนขับรถ`,
	}).toString();

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverEntry>[] =
	[
		{
			label: "คนขับรถ",
			compare: (a, b) =>
				a.name.localeCompare(b.name),
			render: (item) => (
				<Typography
					component={Link}
					to={{
						pathname: "/drivers/info/" + item.id,
						search: CURR_ROUTE_SEARCH_PARAM,
					}}
				>
					{item.name} {item.surname}
				</Typography>
			),
		},
		{
			label: "สายรถปัจจุบัน",
			compare: null,
			render: (item) =>
				item.routes.length === 0 ? (
					<Typography fontStyle="italic">
						ไม่มี
					</Typography>
				) : (
					<Stack spacing={1}>
						{item.routes.map((route, index) => (
							<Typography
								key={"route" + index}
								component={Link}
								to={{
									pathname:
										"/pickup-routes/info/" +
										route.id,
									search: CURR_ROUTE_SEARCH_PARAM,
								}}
							>
								{route.name}
							</Typography>
						))}
					</Stack>
				),
		},
		{
			label: "ทะเบียนรถปัจจุบัน",
			compare: null,
			render: (item) =>
				item.vehicles.length === 0 ? (
					<Typography fontStyle="italic">
						ไม่มี
					</Typography>
				) : (
					<Stack spacing={1}>
						{item.vehicles.map(
							(vehicle, index) => (
								<Typography
									key={"vehicle" + index}
									component={Link}
									to={{
										pathname:
											"/vehicles/info/" +
											vehicle.id,
										search:
											CURR_ROUTE_SEARCH_PARAM,
									}}
								>
									{vehicle.licensePlate}
								</Typography>
							),
						)}
					</Stack>
				),
		},
	];

type DriverTableProps = {
	entries: DriverEntry[];
};
export const DriverTable: FC<DriverTableProps> = (
	props,
) => {
	const { entries } = props;
	const [search, setSearch] = useState("");
	const submit = useSubmit();
	const filteredEntries = filterItems(
		entries,
		search,
		[
			"name",
			"surname",
			"vehicles.*.licensePlate",
			"routes.*.name",
		],
	);

	return (
		<Stack spacing={1}>
			<BaseSortableTableToolbar
				slotProps={{
					searchField: {
						placeholder: `ค้นหาด้วยชื่อสกุลคนขับรถ, เลขทะเบียนรถ, หรือสายรถ`,
						value: search,
						onChange: setSearch,
					},
					addButton: {
						label: `เพิ่มคนขับรถ`,
						onClick: () =>
							submit(
								{},
								{
									action: "./new",
								},
							),
					},
				}}
			/>
			<BaseSortableTable
				headers={HEADER_DEFINITIONS}
				defaultSortOrder="asc"
				defaultSortByColumn={0}
				entries={filteredEntries}
				slotProps={{
					body: {
						emptyText: "ไม่พบคนขับรถ",
					},
				}}
			/>
		</Stack>
	);
};
