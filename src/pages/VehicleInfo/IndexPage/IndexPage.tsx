import { BaseTOC } from "$components/BaseTOC";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { VehicleDetails } from "$components/VehicleDetails";
import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";
import { VehicleReportInspectionTable } from "$components/VehicleReportInspectionTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

const TOC_ITEMS: {
	label: string;
	href: string;
}[] = [
	{ label: "ข้อมูลรถ", href: "#info" },
	{
		label: "oplog",
		href: "#operational-log",
	},
	{
		label: "เรื่องร้องเรียน",
		href: "#general-report",
	},
	{
		label: "ผลการตรวจสภาพ",
		href: "#inspection-report",
	},
];

export const IndexPage: FC = () => {
	const {
		logEntries,
		generalEntries,
		inspectionEntries,
		vehicle,
		images,
	} = useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	const heading = `ข้อมูลทะเบียนรถ +++++++++++++++++++++++++`;

	return (
		<Stack spacing={1}>
			<BaseTOC>{TOC_ITEMS}</BaseTOC>
			<Typography
				variant="h1"
				id="info"
			>
				{heading}
			</Typography>
			<VehicleDetails
				images={images}
				vehicle={vehicle}
			/>
			<Typography
				variant="h2"
				id="operational-log"
			>
				ประวัติการเดินรถ++++++++++++++++
			</Typography>
			<OperationalLogTable
				entries={logEntries}
				onAdd={() => {}}
			/>
			<Typography
				variant="h2"
				id="general-report"
			>
				เรื่องร้องเรียน++++++++++++++++++++
			</Typography>
			<VehicleReportGeneralTable
				entries={generalEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/general" },
					)
				}
			/>
			<Typography
				variant="h2"
				id="inspection-report"
			>
				ผลการตรวจสภาพรถ++++++++++++++++++++++
			</Typography>
			<VehicleReportInspectionTable
				entries={inspectionEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/inspection" },
					)
				}
			/>
		</Stack>
	);
};
