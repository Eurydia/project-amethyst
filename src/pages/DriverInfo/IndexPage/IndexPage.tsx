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
		driver,
		galleryDirPath,
		galleryFileEntries,
		logEntries,
		generalEntries,
		medicalEntries,
		driverMultiSelectOptions,
		vehicleMultiSelectOptions,
		routeMultiSelectOptions,
		topicMultiSelectOptions,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<BaseTOC>{TOC_ITEMS}</BaseTOC>
			<Typography
				variant="h1"
				id="info"
			>
				{`ข้อมูลคนขับรถของ "${driver.name} ${driver.surname}"`}
			</Typography>
			<DriverInfoGroup
				driver={driver}
				slotProps={{
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
					driverMultiSelect: {
						disabled: true,
						options: driverMultiSelectOptions,
					},
					routeMultiSelect: {
						options: routeMultiSelectOptions,
					},
					vehicleMultiSelect: {
						options: vehicleMultiSelectOptions,
					},
					addButton: {
						disabled:
							vehicleMultiSelectOptions.length ===
								0 ||
							routeMultiSelectOptions.length ===
								0,
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
				entries={generalEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{ action: "./report/general" },
							),
					},
					driverMultiSelect: {
						disabled: true,
						options: driverMultiSelectOptions,
					},
					topicMultiSelect: {
						options: topicMultiSelectOptions,
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
								{},
								{ action: "./report/medical" },
							),
					},
					driverMultiSelect: {
						disabled: true,
						options: driverMultiSelectOptions,
					},
					topicMultiSelect: {
						options: topicMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
