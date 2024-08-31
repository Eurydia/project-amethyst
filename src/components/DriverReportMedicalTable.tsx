import { TableHeaderDefinition } from "$types/generics";
import { DriverReport } from "$types/models";
import { Typography } from "@mui/material";
import { FC } from "react";
import { DriverReportTable } from "./DriverReportTable";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverReport>[] =
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
				a.driver_name.localeCompare(
					b.driver_name,
				),
			render: (item) => (
				<Typography
					component={Link}
					to={"/drivers/info/" + item.driver_id}
				>
					{item.driver_name} {item.driver_surname}
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
	entries: DriverReport[];
	onAdd: () => void;
};
export const DriverReportMedicalTable: FC<
	DriverReportMedicalTableProps
> = (props) => {
	const { entries, onAdd } = props;

	return (
		<DriverReportTable
			onAdd={onAdd}
			headers={HEADER_DEFINITIONS}
			entries={entries}
			searchPlaceholder="ค้นหาผลการตรวจสารเสพติด"
		/>
	);
};
