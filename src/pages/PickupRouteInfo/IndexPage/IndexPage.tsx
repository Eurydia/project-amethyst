import { BaseTOC } from "$components/BaseTOC";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { PickupRouteInfoGroup } from "$components/PickupRouteInfoGroup";
import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { TRANSLATION } from "$locale/th";
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
	{
		label: "ข้อมูลสายรถ",
		href: "#info",
	},
	{
		label: TRANSLATION.operationalLogTable,
		href: "#operational-log",
	},
	{
		label: "ตารางบันทึกเรื่องร้องเรียนสายรถ",
		href: "#report-general",
	},
];

export const IndexPage: FC = () => {
	const {
		route,

		logEntries,
		reportEntries,

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
				ข้อมูลสายรถ
			</Typography>
			<PickupRouteInfoGroup route={route} />
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
						onClick: () =>
							submit(
								{},
								{ action: "./log/operational" },
							),
					},
					routeMultiSelect: {
						disabled: true,
						options: routeMultiSelectOptions,
					},
					driverMultiSelect: {
						options: driverMultiSelectOptions,
					},
					vehicleMultiSelect: {
						options: vehicleMultiSelectOptions,
					},
				}}
			/>
			<Typography
				variant="h2"
				id="report-general"
			>
				ตารางบันทึกเรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportGeneralTable
				entries={reportEntries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{ action: "./report/general" },
							),
					},
					routeMultiSelect: {
						disabled: true,
						options: routeMultiSelectOptions,
					},
					topicMultiSelect: {
						options: topicMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
