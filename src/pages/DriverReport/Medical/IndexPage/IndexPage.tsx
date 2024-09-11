import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { reportEntries, preventAddReport } =
		useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางบันทึกผลการตรวจสารเสพติด
			</Typography>
			<DriverReportMedicalTable
				entries={reportEntries}
				slotProps={{
					addButton: {
						disabled: preventAddReport,
						onClick: () =>
							submit({}, { action: "./new" }),
					},
				}}
			/>
		</Stack>
	);
};
