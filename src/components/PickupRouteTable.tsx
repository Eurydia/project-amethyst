import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { PickupRouteEntryImpl } from "$types/impl/PickupRoute";
import { PickupRouteEntry } from "$types/models/PickupRoute";
import { Stack, Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITION: TableHeaderDefinition<PickupRouteEntry>[] =
	[
		{
			label: "สายรถ",
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
		{
			label: "คนขับรถ",
			compare: null,
			render: (item) =>
				item.drivers.length === 0 ? (
					<Typography>ไม่มี</Typography>
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
	slotProps: {
		routeMultiSelect: {
			options: MultiSelectOption[];
		};
	};
};
export const PickupRouteTable: FC<
	PickupRouteTableProps
> = (props) => {
	const { entries, slotProps } = props;
	const submit = useSubmit();

	const [search, setSearch] = useState("");
	const [routes, setRoutes] = useState(
		slotProps.routeMultiSelect.options.map(
			({ value }) => value,
		),
	);

	const filteredEntries =
		PickupRouteEntryImpl.filter(
			entries,
			routes,
			search,
		);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "สายรถ",
			value: (
				<BaseInputMultiSelect
					onChange={setRoutes}
					options={
						slotProps.routeMultiSelect.options
					}
					selectedOptions={routes}
				/>
			),
		},
	];
	return (
		<BaseSortableTable
			defaultSortOrder="asc"
			defaultSortByColumn={0}
			headers={HEADER_DEFINITION}
			entries={filteredEntries}
			slotProps={{
				searchField: {
					placeholder:
						"ค้นหาด้วยสายรถ, ทะเบียนรถ, หรือชื่อนามสกุลคนขับรถ",
					value: search,
					onChange: setSearch,
				},
				addButton: {
					label: "ลงทะเบียน",
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
