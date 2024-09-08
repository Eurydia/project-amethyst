import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { OperationalLogEntryImpl } from "$types/impl/OperationalLog";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<OperationalLogEntry>[] =
	[
		{
			label: "เริ่มมีผล",
			compare: (a, b) =>
				dayjs(a.startDate).unix() -
				dayjs(b.startDate).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.startDate)
						.locale("th")
						.format("DD MMMM YYYY")}
				</Typography>
			),
		},
		{
			label: "สิ้นสุด",
			compare: (a, b) =>
				dayjs(a.endDate).unix() -
				dayjs(b.endDate).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.endDate)
						.locale("th")
						.format("DD MMMM YYYY")}
				</Typography>
			),
		},
		{
			label: "คนขับรถ",
			compare: (a, b) =>
				a.driverName.localeCompare(b.driverName),
			render: (item) => (
				<Typography
					component={Link}
					to={"/drivers/info/" + item.driverId}
				>
					{item.driverName} {item.driverSurname}
				</Typography>
			),
		},
		{
			label: "เลขทะเบียน",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={"/vehicles/info/" + item.vehicleId}
				>
					{item.vehicleLicensePlate}
				</Typography>
			),
		},
		{
			label: "สายรถ",
			compare: (a, b) =>
				a.routeName.localeCompare(b.routeName),
			render: (item) => (
				<Typography
					component={Link}
					to={
						"/pickup-routes/info/" + item.routeId
					}
				>
					{item.routeName}
				</Typography>
			),
		},
	];

type OperationalLogTableProps = {
	entries: OperationalLogEntry[];
	slotProps: {
		addButton: {
			disabled?: boolean;
			onClick: () => void;
		};
		vehicleMultiSelect: {
			options: MultiSelectOption[];
			disabled?: boolean;
		};
		driverMultiSelect: {
			options: MultiSelectOption[];
			disabled?: boolean;
		};
		routeMultiSelect: {
			options: MultiSelectOption[];
			disabled?: boolean;
		};
	};
};
export const OperationalLogTable: FC<
	OperationalLogTableProps
> = (props) => {
	const { slotProps, entries } = props;

	const [search, setSearch] = useState("");
	const [routes, setRoutes] = useState(
		slotProps.routeMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const [vehicles, setVehicles] = useState(
		slotProps.vehicleMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const [drivers, setDrivers] = useState(
		slotProps.driverMultiSelect.options.map(
			({ value }) => value,
		),
	);

	const filteredEntries =
		OperationalLogEntryImpl.filter(
			entries,
			new Set(drivers),
			new Set(routes),
			new Set(vehicles),
			search,
		);

	const fitlerFormItems = [
		{
			label: "สายรถ",
			value: (
				<BaseInputMultiSelect
					disabled={
						slotProps.routeMultiSelect.disabled
					}
					options={
						slotProps.routeMultiSelect.options
					}
					selectedOptions={routes}
					onChange={setRoutes}
				/>
			),
		},
		{
			label: "เลขทะเบียน",
			value: (
				<BaseInputMultiSelect
					disabled={
						slotProps.vehicleMultiSelect.disabled
					}
					options={
						slotProps.vehicleMultiSelect.options
					}
					selectedOptions={vehicles}
					onChange={setVehicles}
				/>
			),
		},
		{
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					disabled={
						slotProps.driverMultiSelect.disabled
					}
					options={
						slotProps.driverMultiSelect.options
					}
					selectedOptions={drivers}
					onChange={setDrivers}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			entries={filteredEntries}
			headers={HEADER_DEFINITIONS}
			defaultSortByColumn={0}
			defaultSortOrder="desc"
			slotProps={{
				searchField: {
					placeholder:
						"ค้นหาด้วยคนขับรถ, เลขทะเบียน, หรือสายรถ",
					value: search,
					onChange: setSearch,
				},
				addButton: {
					label: "ลงบันทึก",
					onClick: slotProps.addButton.onClick,
					disabled: slotProps.addButton.disabled,
				},
			}}
		>
			{fitlerFormItems}
		</BaseSortableTable>
	);
};
