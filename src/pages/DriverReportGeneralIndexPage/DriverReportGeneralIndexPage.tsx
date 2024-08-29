import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { TypographyAlert } from "$components/TypographyAlert";
import {
	Stack,
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
				<DriverReportGeneralTable
					driverOptions={driverOptions}
					entries={entries}
					topicOptions={topicOptions}
				/>
			</Stack>
		);
	};
