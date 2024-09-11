import { BaseSortableTable } from "$components/BaseSortableTable";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverEntry } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";

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

type DriverTableProps = {
	entries: DriverEntry[];
	slotProps: {
		searchField: {
			placeholder: string;
		};
		addButton: {
			label: string;
			onClick: () => void;
		};
	};
};
export const DriverTable: FC<DriverTableProps> = (
	props,
) => {
	const { entries, slotProps } = props;
	const [search, setSearch] = useState("");
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
						onChange: setSearch,
						value: search,
						placeholder:
							slotProps.searchField.placeholder,
					},
					addButton: {
						label: slotProps.addButton.label,
						onClick: slotProps.addButton.onClick,
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
						emptyText: "ไม่พบคนขับรถ",
					},
				}}
			/>
		</Stack>
	);
};
