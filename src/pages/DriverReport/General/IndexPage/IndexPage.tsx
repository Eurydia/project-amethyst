import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const {
		reportEntries,
		databaseIsMissingDriver,
	} = useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to="/"
			>
				<KeyboardArrowLeftRounded />
				หน้าแรก
			</Typography>
			<Typography variant="h1">
				ตารางบันทึกเรื่องร้องเรียนคนขับรถ
			</Typography>
			<DriverReportGeneralTable
				entries={reportEntries}
				slotProps={{
					addButton: {
						disabled: databaseIsMissingDriver,
						onClick: () =>
							submit(
								{},
								{
									replace: true,
									action: "./new",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
