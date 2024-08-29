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
			key: "datetime",
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime).unix() -
				dayjs(b.datetime).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime)
						.locale("th")
						.format("HH:mm น. DD/MM/YYYY")}
				</Typography>
			),
		},
		{
			key: "driver_name",
			label: "ชื่อและนามสกุล",
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
			key: "title",
			label: "เรื่อง",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={
						"/drivers/report/general/info/" +
						item.id
					}
				>
					{item.title}
				</Typography>
			),
		},
		{
			key: "topics",
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) => (
				<Typography>
					{item.topics.join(", ")}
				</Typography>
			),
		},
	];

type DriverReportGeneralTableProps = {
	topicOptions: string[];
	driverOptions: string[];
	entries: DriverReport[];
};
export const DriverReportGeneralTable: FC<
	DriverReportGeneralTableProps
> = (props) => {
	const { entries, driverOptions, topicOptions } =
		props;

	return (
		<DriverReportTable
			headers={HEADER_DEFINITIONS}
			entries={entries}
			defaultSortBy="datetime"
			defaultSortOrder="desc"
			searchPlaceholder="ค้นหาประวัติการร้องเรียน"
			driverOptions={driverOptions}
			topicOptions={topicOptions}
		/>
	);
};
