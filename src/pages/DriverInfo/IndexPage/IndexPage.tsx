import { BaseTOC } from "$components/BaseTOC";
import { DriverInfoGroup } from "$components/DriverInfoGroup";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { TRANSLATION } from "$locale/th";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

const TOC_ITEMS = [
	{
		label: TRANSLATION.driverInfo,
		href: "#info",
	},
	{
		label: TRANSLATION.operationalLogTable,
		href: "#operational-log",
	},
	{
		label: TRANSLATION.driverGeneralReportTable,
		href: "#general-report",
	},
	{
		label: TRANSLATION.driverMedicalReportTable,
		href: "#medical-report",
	},
];

export const IndexPage: FC = () => {
	const {
		images,
		driver,
		logEntries,
		generalEntries,
		medicalEntries,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<BaseTOC>{TOC_ITEMS}</BaseTOC>
			<Typography
				variant="h1"
				id="info"
			>
				ข้อมูลคนขับรถ
			</Typography>
			<DriverInfoGroup
				images={images}
				driver={driver}
			/>
			<Typography
				variant="h2"
				id="operational-log"
			>
				ตารางบันทึกประวัติการเดินรถ
			</Typography>
			<OperationalLogTable
				entries={logEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{ action: "./log/operational" },
							),
					},
				}}
			/>
			<Typography
				variant="h2"
				id="general-report"
			>
				ตารางบันทึกเรื่องร้องเรียนคนขับ
			</Typography>
			<DriverReportGeneralTable
				entries={generalEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{ action: "./report/general" },
							),
					},
				}}
			/>
			<Typography
				variant="h2"
				id="medical-report"
			>
				ตารางบันทึกผลการตรวจสารเสพติด
			</Typography>
			<DriverReportMedicalTable
				entries={medicalEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{ action: "./report/medical" },
							),
					},
				}}
			/>
		</Stack>
	);
};
