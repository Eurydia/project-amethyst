import { BaseTOC } from "$components/BaseTOC";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { PickupRouteDetails } from "$components/PickupRouteDetails";
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
	const { route } =
		useLoaderData() as IndexPageLoaderData;

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
			<PickupRouteDetails route={route} />
			<Typography
				variant="h2"
				id="operational-log"
			>
				{TRANSLATION.operationalLogTable}
			</Typography>
			<OperationalLogTable
				route={route}
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
				id="report-general"
			>
				ตารางบันทึกเรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportGeneralTable
				route={route}
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
