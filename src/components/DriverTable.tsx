/** @format */

import { tauriPostDriver } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverEntry, DriverFormData } from "$types/models/driver";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { DriverForm } from "./DriverForm";

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverEntry>[] = [
	{
		label: "คนขับรถ",
		compare: (a, b) => a.name.localeCompare(b.name),
		render: (item) => (
			<BaseTypographyLink to={"/drivers/info/" + item.id}>
				{item.name} {item.surname}
			</BaseTypographyLink>
		),
	},
	{
		label: "สายรถปัจจุบัน",
		compare: null,
		render: (item) =>
			item.routes.length === 0 ? (
				<Typography fontStyle="italic">ไม่มี</Typography>
			) : (
				<Stack spacing={1}>
					{item.routes.map((route, index) => (
						<BaseTypographyLink
							key={"route" + index}
							to={"/pickup-routes/info/" + route.id}
						>
							{route.name}
						</BaseTypographyLink>
					))}
				</Stack>
			),
	},
	{
		label: "ทะเบียนรถปัจจุบัน",
		compare: null,
		render: (item) =>
			item.vehicles.length === 0 ? (
				<Typography fontStyle="italic">ไม่มี</Typography>
			) : (
				<Stack spacing={1}>
					{item.vehicles.map((vehicle, index) => (
						<BaseTypographyLink
							key={"vehicle" + index}
							to={"/vehicles/info/" + vehicle.id}
						>
							{vehicle.licensePlate}
						</BaseTypographyLink>
					))}
				</Stack>
			),
	},
];

type DriverTableProps = {
	driverEntries: DriverEntry[];
};
export const DriverTable: FC<DriverTableProps> = (props) => {
	const { driverEntries } = props;
	const { revalidate } = useRevalidator();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [search, setSearch] = useState("");

	const filteredEntries = filterItems(driverEntries, search, [
		"name",
		"surname",
		"vehicles.*.licensePlate",
		"routes.*.name",
	]);

	const databaseHasNoDrivers = driverEntries.length === 0;

	return (
		<Stack spacing={1}>
			<BaseSortableTableToolbar
				slotProps={{
					searchField: {
						value: search,
						onChange: setSearch,
						placeholder: "ค้นหาด้วยชื่อสกุลคนขับรถ, เลขทะเบียน, หรือสายรถ",
					},
					addButton: {
						// TODO: translate
						children: "Register driver",
						onClick: () => setDialogOpen(true),
					},
					importButton: {
						children: "Register from file",
						onFileSelect: function (): void {
							throw new Error("Function not implemented.");
						},
					},
					exportButton: {
						// TODO: translate
						children: "Export drivers",
						onClick: function (): void {
							throw new Error("Function not implemented.");
						},
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
						// TODO: translate
						emptyText: databaseHasNoDrivers
							? "The database has no driver"
							: "ไม่พบคนขับรถ",
					},
				}}
			/>
			<DriverForm
				initFormData={{
					contact: "",
					licenseType: "",
					name: "",
					surname: "",
				}}
				title="ลงทะเบียนคนขับรถ"
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				slotProps={{
					submitButton: {
						startIcon: <AddRounded />,
						label: "เพิ่มคนขับรถ",
						onClick: (formData: DriverFormData) =>
							tauriPostDriver(formData)
								.then(
									() => {
										// TODO: translate
										toast.success("Success");
										revalidate();
									},
									() => toast.error("Failed")
								)
								.finally(() => setDialogOpen(false)),
					},
				}}
			/>
		</Stack>
	);
};
