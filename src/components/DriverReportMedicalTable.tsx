import { TableHeaderDefinition } from "$types/generics";
import { Typography } from "@mui/material";
import { FC } from "react";
import { DriverReportTable } from "./DriverReportTable";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DriverReportEntry } from "$types/models/Driver";
import { TRANSLATION } from "$locale/th";

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverReportEntry>[] =
	[
		{
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime).unix() -
				dayjs(b.datetime).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime).format(
						"HH:mm น. DD/MM/YYYY",
					)}
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
			label: "เรื่อง",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={
						"/drivers/report/medical/info/" +
						item.id
					}
				>
					{item.title}
				</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) => (
				<Typography>
					{item.topics.join(", ")}
				</Typography>
			),
		},
	];

type DriverReportMedicalTableProps = {
	entries: DriverReportEntry[];
	onAdd: () => void;
};
export const DriverReportMedicalTable: FC<
	DriverReportMedicalTableProps
> = (props) => {
	const { entries, onAdd } = props;

	return (
		<DriverReportTable
			headers={HEADER_DEFINITIONS}
			entries={entries}
			slotProps={{
				addButton: {
					children:
						TRANSLATION.postDriverMedicalReport,
					onClick: onAdd,
				},
				searchField: {
					placeholder:
						TRANSLATION.searchDriverMedicalReport,
				},
			}}
		/>
	);
};
