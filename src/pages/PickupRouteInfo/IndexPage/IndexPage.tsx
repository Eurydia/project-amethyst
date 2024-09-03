import { BaseTOC } from "$components/BaseTOC";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { PickupRouteDetails } from "$components/PickupRouteDetails";
import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
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
		label: "ตารางบันทึกประวัติการเดินรถ",
		href: "#operational-log",
	},
	{
		label: "ตารางบันทึกเรื่องร้องเรียนสายรถ",
		href: "#report-general",
	},
];

export const IndexPage: FC = () => {
	const { route, logEntries, generalEntries } =
		useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	const heading = `ข้อมูลสายรถ`;

	return (
		<Stack spacing={1}>
			<BaseTOC>{TOC_ITEMS}</BaseTOC>
			<Typography
				variant="h1"
				id="info"
			>
				{heading}
			</Typography>
			<PickupRouteDetails route={route} />
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
						onClick: () => {},
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
		</Stack>
	);
};
