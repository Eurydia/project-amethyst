import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				ตารางบันทึกเรื่องร้องเรียนคนขับรถ
			</Typography>
			<DriverReportGeneralTable
				entries={entries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{
									action:
										"/drivers/report/general/new",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
