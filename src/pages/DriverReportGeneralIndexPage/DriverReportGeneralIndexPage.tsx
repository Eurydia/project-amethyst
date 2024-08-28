import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportTable } from "$components/DriverReportTable";
import { TypographyAlert } from "$components/TypographyAlert";
import {
	Stack,
	TableContainer,
	Toolbar,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { DriverReportGeneralIndexPageLoaderData } from "./loader";

export const DriverReportGeneralIndexPage: FC =
	() => {
		const {
			entries,
			driverOptions,
			topicOptions,
		} =
			useLoaderData() as DriverReportGeneralIndexPageLoaderData;

		return (
			<Stack spacing={1}>
				<Typography variant="h1">
					ตารางบันทึกการร้องเรียนคนขับรถ
				</Typography>
				<TypographyAlert severity="info">
					TBA
				</TypographyAlert>
				<Toolbar
					disableGutters
					variant="dense"
				>
					<DriverReportGeneralButton
						path="./new"
						variant="contained"
					/>
				</Toolbar>
				<TableContainer>
					<DriverReportTable
						defaultSortBy="datetime_iso"
						defaultSortOrder="desc"
						driverOptions={driverOptions}
						entries={entries}
						topicOptions={topicOptions}
						searchPlaceholder="ค้นหาประวัติการร้องเรียน"
					/>
				</TableContainer>
			</Stack>
		);
	};
