import { DriverReportMedicalButton } from "$components/DriverReportMedicalButton";
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
import { DriverReportMedicalIndexPageLoaderData } from "./loader";

export const DriverReportMedicalIndexPage: FC =
	() => {
		const {
			entries,
			driverOptions,
			topicOptions,
		} =
			useLoaderData() as DriverReportMedicalIndexPageLoaderData;

		return (
			<Stack spacing={1}>
				<Typography variant="h1">
					ตารางบันทึกผลการตรวจสารเสพติด
				</Typography>
				<TypographyAlert severity="info">
					TBA
				</TypographyAlert>
				<Toolbar
					disableGutters
					variant="dense"
				>
					<DriverReportMedicalButton
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
						searchPlaceholder="ค้นหาประวัติการตรวจสารเสพติด"
					/>
				</TableContainer>
			</Stack>
		);
	};
