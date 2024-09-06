import { BaseTOC } from "$components/BaseTOC";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { VehicleInfoGroup } from "$components/VehicleInfoGroup";
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
	{ label: "ข้อมูลรถรับส่ง", href: "#info" },
	{
		label: "ตารางบันทึกประวัติการเดินรถ",
		href: "#operational-log",
	},
	{
		label: "ตารางบันทึกเรื่องร้องเรียนรถรับส่ง",
		href: "#general-report",
	},
	{
		label: "ตารางบันทึกผลการตรวจสภาพรถ",
		href: "#inspection-report",
	},
];

export const IndexPage: FC = () => {
	const {
		vehicle,

		galleryDirPath,
		galleryFileEntries,

		logEntries,
		generalEntries,
		inspectionEntries,
		topicMultiSelectOptions,
		driverMultiSelectOptions,
		routeMultiSelectOptions,
		vehicleMultiSelectOptions,
	} = useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<BaseTOC>{TOC_ITEMS}</BaseTOC>
			<Typography
				variant="h1"
				id="info"
			>
				ข้อมูลรถรับส่ง
			</Typography>
			<VehicleInfoGroup
				vehicle={vehicle}
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
				ตารางบันทึกประวัติการเดินรถ
			</Typography>
			<OperationalLogTable
				entries={logEntries}
				slotProps={{
					driverMultiSelect: {
						options: driverMultiSelectOptions,
					},
					routeMultiSelect: {
						options: routeMultiSelectOptions,
					},
					vehicleMultiSelect: {
						disabled: true,
						options: vehicleMultiSelectOptions,
					},
					addButton: {
						isDisabled:
							driverMultiSelectOptions.length ===
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
				ตารางบันทึกเรื่องร้องเรียนรถรับส่ง
			</Typography>
			<VehicleReportGeneralTable
				entries={generalEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{ action: "./report/general" },
							),
					},
					topicMultiSelect: {
						options: topicMultiSelectOptions,
					},
					vehicleMultiSelect: {
						disabled: true,
						options: vehicleMultiSelectOptions,
					},
				}}
			/>
			<Typography
				variant="h2"
				id="inspection-report"
			>
				ตารางบันทึกผลการตรวจสภาพรถ
			</Typography>
			<VehicleReportInspectionTable
				entries={inspectionEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{ action: "./report/inspection" },
							),
					},
					topicMultiSelect: {
						options: topicMultiSelectOptions,
					},
					vehicleMultiSelect: {
						disabled: true,
						options: vehicleMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
