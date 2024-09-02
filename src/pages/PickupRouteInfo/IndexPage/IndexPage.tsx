import { OperationalLogTable } from "$components/OperationalLogTable";
import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { TypographyButton } from "$components/TypographyButton";
import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import {
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { IndexPageLoaderData } from "./loader";

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
							ข้อมูลคนขับรถ
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
							href="#general-report"
						>
							ประวัติการร้องเรียน
						</Typography>
					</ListItemText>
				</ListItem>
			</List>
		</Fragment>
	);
};

export const IndexPage: FC = () => {
	const {
		route,
		operationalLogEntries,
		generalReportEntries,
	} = useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อสายรถ",
			value: (
				<Typography>{route.name}</Typography>
			),
		},
		{
			label: "เวลานำเข้า",
			value: (
				<Typography>
					{dayjs(
						route.arrival_time,
						"HH:mm",
					).format("HH:mm น.")}
				</Typography>
			),
		},
		{
			label: "เวลานำออก",
			value: (
				<Typography>
					{dayjs(
						route.departure_time,
						"HH:mm",
					).format("HH:mm น.")}
				</Typography>
			),
		},
	];

	const heading = `ข้อมูลสายรถ "${route.name}"`;

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
				id="general-report"
			>
				ตารางบันทึกเรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportGeneralTable
				entries={generalReportEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/general" },
					)
				}
			/>
		</Stack>
	);
};
