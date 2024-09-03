import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteReportEntry } from "$types/models/PickupRoute";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PickupRouteReportTable } from "./PickupRouteReportTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<PickupRouteReportEntry>[] =
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
			label: "เรื่อง",
			compare: null,
			render: (item) => (
				<Typography>
					<Link
						to={
							"/pickup-routes/report/general/info/" +
							item.id
						}
					>
						{item.title}
					</Link>
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
	entries: PickupRouteReportEntry[];
	slotProps: {
		addButton: {
			onClick: () => void;
		};
	};
};
export const PickupRouteReportGeneralTable: FC<
	PickupRouteReportGeneralTableProps
> = (props) => {
	const { entries, slotProps } = props;

	return (
		<PickupRouteReportTable
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
