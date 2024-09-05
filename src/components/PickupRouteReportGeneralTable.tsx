import {
	getPickupRoute,
	getPickupRouteReportGeneralAll,
} from "$backend/database/get";
import { TableHeaderDefinition } from "$types/generics";
import {
	PickupRouteModel,
	PickupRouteReportEntry,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
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
			compare: (a, b) =>
				a.title.localeCompare(b.title),
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

const toEntry = async (
	report: PickupRouteReportModel,
) => {
	const route = await getPickupRoute(
		report.route_id,
	);
	if (route === null) {
		return null;
	}
	const entry: PickupRouteReportEntry = {
		datetime: report.datetime,
		id: report.id,
		title: report.title,
		topics: report.topics.split(","),

		routeId: route.id,
		routeName: route.name,
	};
	return entry;
};

type PickupRouteReportGeneralTableProps = {
	route?: PickupRouteModel;
	slotProps: {
		addButton: {
			onClick: () => void;
		};
	};
};
export const PickupRouteReportGeneralTable: FC<
	PickupRouteReportGeneralTableProps
> = (props) => {
	const { slotProps, route } = props;

	const [entries, setEntries] = useState<
		PickupRouteReportEntry[]
	>([]);

	useEffect(() => {
		(async () => {
			const reports =
				await getPickupRouteReportGeneralAll();

			const itemRequests = reports
				.filter(
					({ route_id }) =>
						route === undefined ||
						route_id === route.id,
				)
				.map(toEntry);
			const requests = await Promise.all(
				itemRequests,
			);
			const entries = requests.filter(
				(entry) => entry !== null,
			);
			setEntries(entries);
		})();
	}, []);

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
