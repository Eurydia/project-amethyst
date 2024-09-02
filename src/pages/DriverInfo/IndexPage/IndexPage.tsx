import { BaseTOC } from "$components/BaseTOC";
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
import { DriverDetails } from "$components/DriverDetails";

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
				{TRANSLATION.driverTable}
			</Typography>
			<DriverDetails
				images={images}
				driver={driver}
			/>
			<Typography
				variant="h2"
				id="operational-log"
			>
				{TRANSLATION.operationalLogTable}
			</Typography>
			<OperationalLogTable
				entries={logEntries}
				onAdd={() => {}}
			/>
			<Typography
				variant="h2"
				id="general-report"
			>
				{TRANSLATION.driverGeneralReportTable}
			</Typography>
			<DriverReportGeneralTable
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
				id="medical-report"
			>
				{TRANSLATION.driverMedicalReportTable}
			</Typography>
			<DriverReportMedicalTable
				entries={medicalEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/medical" },
					)
				}
			/>
		</Stack>
	);
};
