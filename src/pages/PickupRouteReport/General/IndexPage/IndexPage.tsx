import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const {
		reportEntries,
		routeMultiSelectOptions,
		topicMultiSelectOptions,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางบันทึกเรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportGeneralTable
				entries={reportEntries}
				slotProps={{
					addButton: {
						disabled:
							routeMultiSelectOptions.length ===
							0,
						onClick: () =>
							submit(
								{},
								{
									action: "./new",
								},
							),
					},
					routeMultiSelect: {
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
