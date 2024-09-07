import { BaseSortableTable } from "$components/BaseSortableTable";
import { TRANSLATION } from "$locale/th";
import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { DriverEntryImpl } from "$types/impl/Driver";
import { DriverEntry } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";

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
			label: "สายรถ",
			compare: null,
			render: (item) =>
				item.routes.length === 0 ? (
					<Typography>
						{TRANSLATION.globalNone}
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
	];

type DriverTableProps = {
	entries: DriverEntry[];
	slotProps: {
		driverMultiSelect: {
			options: MultiSelectOption[];
		};
	};
};
export const DriverTable: FC<DriverTableProps> = (
	props,
) => {
	const { entries, slotProps } = props;
	const submit = useSubmit();
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState(
		slotProps.driverMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const filteredEntries = DriverEntryImpl.filter(
		entries,
		selected,
		search,
	);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					onChange={setSelected}
					options={
						slotProps.driverMultiSelect.options
					}
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
			entries={filteredEntries}
			slotProps={{
				searchField: {
					placeholder:
						"ค้นหาด้วยชื่อนามสกุลคนขับรถ, สายรถ, หรือทะเบียนรถ",
					value: search,
					onChange: setSearch,
				},
				addButton: {
					label: "ลงทะเบียน",
					onClick: () =>
						submit(
							{},
							{
								action: "/drivers/new",
							},
						),
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};
