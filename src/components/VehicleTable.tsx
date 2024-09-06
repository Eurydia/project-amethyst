import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { VehicleEntryImpl } from "$types/impl/Vehicle";
import { VehicleEntry } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

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

type VehicleTableProps = {
	entries: VehicleEntry[];
	slotProps: {
		vehicleMultiSelect: {
			options: MultiSelectOption[];
		};
	};
};
export const VehicleTable: FC<
	VehicleTableProps
> = (props) => {
	const { entries, slotProps } = props;
	const submit = useSubmit();

	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState(
		slotProps.vehicleMultiSelect.options.map(
			({ value }) => value,
		),
	);

	const filteredEntries = VehicleEntryImpl.filter(
		entries,
		selected,
		search,
	);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ทะเบียนรถ",
			value: (
				<BaseInputMultiSelect
					options={
						slotProps.vehicleMultiSelect.options
					}
					selectedOptions={selected}
					onChange={setSelected}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			headers={HEADER_DEFINITION}
			defaultSortOrder="asc"
			defaultSortByColumn={0}
			entries={filteredEntries}
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
		>
			{formItems}
		</BaseSortableTable>
	);
};
