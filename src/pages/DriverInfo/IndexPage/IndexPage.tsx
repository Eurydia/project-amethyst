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
		label: TRANSLATION.driverInfoGroup,
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
		// shouldDisableOperationalLogPost,
		// images,
		driver,
		// logEntries,
		// generalEntries,
		// medicalEntries,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<BaseTOC>{TOC_ITEMS}</BaseTOC>
			<Typography
				variant="h1"
				id="info"
			>
				{TRANSLATION.driverInfoGroup}
			</Typography>
			<DriverInfoGroup driver={driver} />
			<Typography
				variant="h2"
				id="operational-log"
			>
				{TRANSLATION.operationalLogTable}
			</Typography>
			<OperationalLogTable
				driver={driver}
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
				{TRANSLATION.driverGeneralReportTable}
			</Typography>
			<DriverReportGeneralTable
				entries={[]}
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
				{TRANSLATION.driverMedicalReportTable}
			</Typography>
			<DriverReportMedicalTable
				entries={[]}
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
