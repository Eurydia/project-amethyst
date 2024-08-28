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
import { useDriverGeneralReportHeaders } from "$hooks/useDriverGeneralReportHeaders";

export const DriverReportGeneralIndexPage: FC =
	() => {
		const {
			entries,
			driverOptions,
			topicOptions,
		} =
			useLoaderData() as DriverReportGeneralIndexPageLoaderData;
		const headers =
			useDriverGeneralReportHeaders();

		return (
			<Stack spacing={1}>
				<Typography variant="h1">
					บันทึกการร้องเรียนคนขับรถ
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
						headers={headers}
						defaultSortBy="datetime_iso"
						defaultSortOrder="desc"
						driverOptions={driverOptions}
						entries={entries}
						topicOptions={topicOptions}
						searchPlaceholder="ค้นหาบันทึกการร้องเรียน"
					/>
				</TableContainer>
			</Stack>
		);
	};
