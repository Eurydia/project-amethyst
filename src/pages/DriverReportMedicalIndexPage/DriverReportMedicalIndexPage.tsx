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
import { useDriverMedicalReportHeaders } from "$hooks/useDriverMedicalReportHeaders";

export const DriverReportMedicalIndexPage: FC =
	() => {
		const {
			entries,
			driverOptions,
			topicOptions,
		} =
			useLoaderData() as DriverReportMedicalIndexPageLoaderData;

		const headers =
			useDriverMedicalReportHeaders();

		return (
			<Stack spacing={1}>
				<Typography variant="h1">
					บันทึกการตรวจสารเสพติด
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
						headers={headers}
						defaultSortBy="datetime_iso"
						defaultSortOrder="desc"
						driverOptions={driverOptions}
						entries={entries}
						topicOptions={topicOptions}
						searchPlaceholder="ค้นหาบันทึกการตรวจสารเสพติด"
					/>
				</TableContainer>
			</Stack>
		);
	};
