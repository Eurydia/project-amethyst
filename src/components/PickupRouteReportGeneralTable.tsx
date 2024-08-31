import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteReport } from "$types/models";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PickupRouteReportTable } from "./PickupRouteReportTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<PickupRouteReport>[] =
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
		{
			label: "เรื่อง",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={
						"/pickup-routes/report/general/info/" +
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

type PickupRouteReportGeneralTableProps = {
	entries: PickupRouteReport[];
	onAdd: () => void;
};
export const PickupRouteReportGeneralTable: FC<
	PickupRouteReportGeneralTableProps
> = (props) => {
	const { onAdd, entries } = props;

	return (
		<PickupRouteReportTable
			onAdd={onAdd}
			headers={HEADER_DEFINITIONS}
			entries={entries}
			searchPlaceholder="ค้นหาประวัติการร้องเรียน"
		/>
	);
};
