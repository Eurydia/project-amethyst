import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportTable } from "$components/DriverReportTable";
import { DriverReport } from "$types/form-data";
import { TableHeaderDefinition } from "$types/generics";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import {
	Link,
	useLoaderData,
} from "react-router-dom";
import { DriverReportGeneralIndexPageLoaderData } from "./loader";

const TABLE_HEADERS: TableHeaderDefinition<DriverReport>[] =
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
				<Typography>
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
					to={"./info/" + item.id}
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

export const DriverReportGeneralIndexPage: FC =
	() => {
		const { entries } =
			useLoaderData() as DriverReportGeneralIndexPageLoaderData;
		return (
			<Stack spacing={2}>
				<Typography variant="h1">
					ประวัติการร้องเรียนคนขับรถ
				</Typography>
				<DriverReportGeneralButton
					path="./new"
					variant="contained"
				/>
				<DriverReportTable
					rows={entries}
					searchKeys={[
						"driver_name",
						"driver_surname",
						"title",
						"topics",
					]}
					headers={TABLE_HEADERS}
					defaultSortBy="datetime_iso"
					defaultSortOrder="asc"
					searchPlaceholder="ค้นหาประวัติการร้องเรียน"
				/>
			</Stack>
		);
	};
