import { putAttendanceLog } from "$backend/database/put";
import { filterItems } from "$core/filter";
import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { AttendanceLogEntry } from "$types/models/AttendanceLog";
import {
	Checkbox,
	FormControlLabel,
	Stack,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import {
	Link,
	useRevalidator,
} from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const TABLE_HEADERS: TableHeaderDefinition<AttendanceLogEntry>[] =
	[
		{
			label: "สายรถ",
			compare: (a, b) =>
				a.routeName.localeCompare(b.routeName),
			render: (item) => (
				<Typography>
					<Link
						to={
							"/pickup-routes/info/" +
							item.routeId
						}
					>
						{item.routeName}
					</Link>
				</Typography>
			),
		},
		{
			label: "เลขทะเบียน",
			compare: (a, b) =>
				a.vehicleLicensePlate.localeCompare(
					b.vehicleLicensePlate,
				),
			render: (item) => (
				<Typography>
					<Link
						to={
							"/vehicles/info/" + item.vehicleId
						}
					>
						{item.vehicleLicensePlate}
					</Link>
				</Typography>
			),
		},
		{
			label: "คนขับรถ",
			compare: (a, b) =>
				a.driverName.localeCompare(b.driverName),
			render: (item) => (
				<Typography>
					<Link
						to={"/drivers/info/" + item.driverId}
					>
						{`${item.driverName} ${item.driverSurname}`}
					</Link>
				</Typography>
			),
		},
		{
			label: "เวลารับข้า",
			compare: null,
			render: (item) => (
				<CustomCheckbox
					label="รับเข้า"
					actual={item.actualArrivalDatetime}
					expected={item.expectedArrivalDatetime}
					onClick={async () =>
						putAttendanceLog({
							id: item.id,
							actualArrivalDatetime:
								dayjs().format(),
							actualDepartureDatetime:
								item.actualDepartureDatetime,
						})
					}
				/>
			),
		},
		{
			label: "เวลารับออก",
			compare: null,
			render: (item) => (
				<CustomCheckbox
					label="รับออก"
					actual={item.actualDepartureDatetime}
					expected={
						item.expectedDepartureDatetime
					}
					onClick={async () =>
						putAttendanceLog({
							id: item.id,
							actualArrivalDatetime:
								item.actualArrivalDatetime,
							actualDepartureDatetime:
								dayjs().format(),
						})
					}
				/>
			),
		},
	];

type CustomCheckboxProps = {
	onClick: () => Promise<void>;
	label: string;
	actual: string | null;
	expected: string;
};
const CustomCheckbox: FC<CustomCheckboxProps> = (
	props,
) => {
	const { actual, label, expected, onClick } =
		props;

	const { revalidate } = useRevalidator();

	const handleClick = async () => {
		if (isChecked) {
			return;
		}
		await onClick();
		revalidate();
	};

	const isChecked = actual !== null;

	let _label = label;
	let lateBy: ReactNode = null;
	if (isChecked) {
		const actualDatetime = dayjs(actual);
		const expectedDatetime = dayjs(expected);

		_label = actualDatetime.format("HH:mm น.");
		if (
			actualDatetime.isAfter(expectedDatetime)
		) {
			const lateByLabel = expectedDatetime
				.locale("th")
				.from(actual, true);
			lateBy = (
				<Typography
					color="error"
					fontWeight="bold"
				>
					{`สายไป ${lateByLabel}`}
				</Typography>
			);
		}
	}

	return (
		<Stack>
			<FormControlLabel
				disableTypography
				checked={isChecked}
				disabled={isChecked}
				onClick={handleClick}
				label={<Typography>{_label}</Typography>}
				control={<Checkbox />}
			/>
			{lateBy}
		</Stack>
	);
};

type AttendanceLogTableProps = {
	slotProps: {
		driverMultiSelect: {
			options: MultiSelectOption[];
		};
		vehicleMultiSelect: {
			options: MultiSelectOption[];
		};
		routeMultiSelect: {
			options: MultiSelectOption[];
		};
	};
	entries: AttendanceLogEntry[];
};
export const AttendanceLogTable: FC<
	AttendanceLogTableProps
> = (props) => {
	const { entries, slotProps } = props;
	const [search, setSearch] = useState("");

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
	const [routes, setRoutes] = useState(
		slotProps.routeMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const driverSet = new Set(drivers);
	const routeSet = new Set(routes);
	const vehicleSet = new Set(vehicles);

	const filteredEntries = filterItems(
		entries.filter(
			({ driverId, routeId, vehicleId }) =>
				routeSet.has(routeId.toString()) &&
				driverSet.has(driverId.toString()) &&
				vehicleSet.has(vehicleId.toString()),
		),
		search,
		[
			"routeName",
			"vehicleLicensePlate",
			"driverName",
			"driverSurname",
		],
	);

	const filterFormItems = [
		{
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					options={
						slotProps.driverMultiSelect.options
					}
					selectedOptions={drivers}
					onChange={setDrivers}
				/>
			),
		},
		{
			label: "สายรถ",
			value: (
				<BaseInputMultiSelect
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
					options={
						slotProps.vehicleMultiSelect.options
					}
					selectedOptions={vehicles}
					onChange={setVehicles}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			headers={TABLE_HEADERS}
			defaultSortByColumn={0}
			defaultSortOrder="asc"
			entries={filteredEntries}
			slotProps={{
				addButton: {
					hidden: true,
					onClick: () => {},
					label: "",
				},
				searchField: {
					onChange: setSearch,
					placeholder:
						"ค้นหาด้วยคนขับรถ, เลขทะเบียน, หรือสายรถ",
					value: search,
				},
			}}
		>
			{filterFormItems}
		</BaseSortableTable>
	);
};
