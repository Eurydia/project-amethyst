import { BaseTOC } from "$components/BaseTOC";
import { DriverInfoGroup } from "$components/DriverInfoGroup";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { TRANSLATION } from "$locale/th";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
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
		databaseIsMissingRoute,
		databaseIsMissingVehicle,
		driver,
		galleryDirPath,
		galleryFileEntries,
		logEntries,
		generalEntries,
		medicalEntries,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to="/drivers"
			>
				<KeyboardArrowLeftRounded />
				{`รายชื่อคนขับรถ`}
			</Typography>
			<Typography
				variant="h1"
				id="info"
			>
				{`${driver.name} ${driver.surname}`}
			</Typography>
			<BaseTOC>{TOC_ITEMS}</BaseTOC>
			<Typography variant="h2">
				{`ข้อมูลคนขับรถ`}
			</Typography>
			<DriverInfoGroup
				driver={driver}
				slotProps={{
					editButton: {
						onClick: () =>
							submit(
								{},
								{
									// replace: true,
									action: "./edit",
								},
							),
					},
					gallery: {
						dirPath: galleryDirPath,
						fileEntries: galleryFileEntries,
					},
				}}
			/>
			<Typography
				variant="h2"
				id="operational-log"
			>
				{TRANSLATION.operationalLogTable}
			</Typography>
			<OperationalLogTable
				entries={logEntries}
				slotProps={{
					addButton: {
						disabled:
							databaseIsMissingVehicle ||
							databaseIsMissingRoute,
						onClick: () =>
							submit(
								{ driverId: driver.id },
								{
									// replace: true,
									action: "/operational-logs/new",
								},
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
				entries={generalEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{
									driverId: driver.id,
								},
								{
									// replace: true,
									action:
										"/drivers/report/general/new",
								},
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
				entries={medicalEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{
									driverId: driver.id,
								},
								{
									// replace: true,
									action:
										"/drivers/report/medical/new",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
