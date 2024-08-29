import { DriverReportMedicalButton } from "$components/DriverReportMedicalButton";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { TypographyAlert } from "$components/TypographyAlert";
import {
	Stack,
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
				<DriverReportMedicalTable
					driverOptions={driverOptions}
					entries={entries}
					topicOptions={topicOptions}
				/>
			</Stack>
		);
	};
