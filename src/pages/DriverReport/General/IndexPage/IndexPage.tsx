import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
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
		driverMultiSelectOptions,
		topicMultiSelectOptions,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				ตารางบันทึกเรื่องร้องเรียนคนขับรถ
			</Typography>
			<DriverReportGeneralTable
				entries={reportEntries}
				slotProps={{
					driverMultiSelect: {
						options: driverMultiSelectOptions,
					},
					topicMultiSelect: {
						options: topicMultiSelectOptions,
					},
					addButton: {
						onClick: () =>
							submit(
								{},
								{
									action: "./new",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
