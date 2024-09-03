import { TableHeaderDefinition } from "$types/generics";
import { DriverReportEntry } from "$types/models/Driver";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { DriverReportTable } from "./DriverReportTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverReportEntry>[] =
	[
		{
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
			compare: (a, b) =>
				a.title.localeCompare(b.title),
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
	entries: DriverReportEntry[];
	slotProps: {
		addButton: {
			onClick: () => void;
		};
	};
};
export const DriverReportGeneralTable: FC<
	DriverReportGeneralTableProps
> = (props) => {
	const { entries, slotProps } = props;

	return (
		<DriverReportTable
			headers={HEADER_DEFINITIONS}
			entries={entries}
			slotProps={{
				addButton: {
					onClick: slotProps.addButton.onClick,
				},
			}}
		/>
	);
};
