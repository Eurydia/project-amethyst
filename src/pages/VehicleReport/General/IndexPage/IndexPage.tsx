import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";
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
		topicMultiSelectOptions,
		vehicleMultiSelectOptions,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางบันทึกเรื่องร้องเรียนรถรับส่ง
			</Typography>
			<VehicleReportGeneralTable
				entries={reportEntries}
				slotProps={{
					addButton: {
						disabled:
							vehicleMultiSelectOptions.length ===
							0,
						onClick: () =>
							submit(
								{},
								{
									action:
										"/vehicles/report/general/new",
								},
							),
					},
					topicMultiSelect: {
						options: topicMultiSelectOptions,
					},
					vehicleMultiSelect: {
						options: vehicleMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
