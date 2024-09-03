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
		label: TRANSLATION.pickupRouteDetails,
		href: "#info",
	},
	{
		label: TRANSLATION.operationalLogTable,
		href: "#operational-log",
	},
	{
		label:
			TRANSLATION.pickupRouteGeneralReportTable,
		href: "#report-general",
	},
];

export const IndexPage: FC = () => {
	const { route, logEntries, generalEntries } =
		useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	const heading =
		TRANSLATION.pickupRouteDetailsWithLabel(
			route.name,
		);

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
				{TRANSLATION.operationalLogTable}
			</Typography>
			<OperationalLogTable
				entries={logEntries}
				onAdd={() => {}}
			/>
			<Typography
				variant="h2"
				id="report-general"
			>
				{
					TRANSLATION.pickupRouteGeneralReportTable
				}
			</Typography>
			<PickupRouteReportGeneralTable
				entries={generalEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/general" },
					)
				}
			/>
		</Stack>
	);
};
