import { Gallery } from "$components/Gallery";
import { TypographyButton } from "$components/TypographyButton";
import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";
import { VehicleReportInspectionTable } from "$components/VehicleReportInspectionTable";
import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import {
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { IndexPageLoaderData } from "./loader";
import { OperationalLogTable } from "$components/OperationalLogTable";

const TableOfContents: FC = () => {
	return (
		<Fragment>
			<Typography>สารบัญ</Typography>
			<List
				dense
				disablePadding
			>
				<ListItem
					disablePadding
					disableGutters
				>
					<ListItemText>
						<Typography
							href="#info"
							component="a"
						>
							ข้อมูลรถ
						</Typography>
					</ListItemText>
				</ListItem>
				<List
					dense
					disablePadding
				>
					<ListItem
						disableGutters
						disablePadding
					>
						<ListItemText>
							<Typography
								component="a"
								href="#report-general"
							>
								เรื่องร้องเรียน
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem
						disableGutters
						disablePadding
					>
						<ListItemText>
							<Typography
								component="a"
								href="#report-routine-maintenance"
							>
								ผลการตรวจสภาพ
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</List>
		</Fragment>
	);
};

export const IndexPage: FC = () => {
	const {
		operationalLogEntries,
		reportGeneralEntries,
		reportInspectionEntries,
		vehicle,
	} = useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "เลขทะเบียน",
			value: (
				<Typography>
					{vehicle.licensePlate}
				</Typography>
			),
		},
		{
			label: "จังหวัดที่จดทะเบียน",
			value: (
				<Typography>
					{vehicle.registeredCity}
				</Typography>
			),
		},
		{
			label: "ประเภทรถ",
			value: (
				<Typography>
					{vehicle.vehicleClass}
				</Typography>
			),
		},
		{
			label: "หจก.",
			value: (
				<Typography>{vehicle.vendor}</Typography>
			),
		},
		{
			label: "คลังภาพ",
			value: (
				<Gallery
					images={vehicle.images}
					onOpenRoot={() => {}}
				/>
			),
		},
	];

	const heading = `ข้อมูลทะเบียนรถ "${vehicle.licensePlate}"`;

	return (
		<Stack spacing={1}>
			<TableOfContents />
			<Typography
				variant="h1"
				id="info"
			>
				{heading}
			</Typography>
			<TypographyButton
				startIcon={<EditRounded />}
				variant="contained"
				onClick={() =>
					submit(
						{},
						{
							action: "./edit",
						},
					)
				}
			>
				แก้ไข้ข้อมูล
			</TypographyButton>
			<FormalLayout>{infoItems}</FormalLayout>
			<Typography
				variant="h2"
				id="operational-log"
			>
				ประวัติการเดินรถ
			</Typography>
			<OperationalLogTable
				entries={operationalLogEntries}
				onAdd={() => {}}
			/>
			<Typography
				variant="h2"
				id="report-general"
			>
				เรื่องร้องเรียน
			</Typography>
			<VehicleReportGeneralTable
				entries={reportGeneralEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/general" },
					)
				}
			/>
			<Typography
				variant="h2"
				id="medical-report"
			>
				ผลการตรวจสภาพรถ
			</Typography>
			<VehicleReportInspectionTable
				entries={reportInspectionEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/inspection" },
					)
				}
			/>
		</Stack>
	);
};
