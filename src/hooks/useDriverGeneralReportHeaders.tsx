import { DriverReport } from "$types/form-data";
import { TableHeaderDefinition } from "$types/generics";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRef } from "react";
import { Link } from "react-router-dom";

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverReport>[] =
	[
		{
			key: "datetime_iso",
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime_iso).unix() -
				dayjs(b.datetime_iso).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime_iso)
						.locale("th")
						.format("HH:mm น. DD/MM/YYYY")}
				</Typography>
			),
		},
		{
			key: "driver_name",
			label: "ชื่อ-นามสกุล",
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

export const useDriverGeneralReportHeaders =
	() => {
		const { current } = useRef<
			TableHeaderDefinition<DriverReport>[]
		>(HEADER_DEFINITIONS);

		return current;
	};
