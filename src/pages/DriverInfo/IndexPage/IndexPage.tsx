import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { Gallery } from "$components/Gallery";
import { OperationalLogTable } from "$components/OperationalLogTable";
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
import { FC, ReactNode } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { IndexPageLoaderData } from "./loader";

const IMAGES = [
	"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=20",
];

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
								href="#general-report"
							>
								ประวัติการร้องเรียน
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
								href="#medical-report"
							>
								ผลการตรวจสารเสพติด
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
		driver,
		operationalLogEntries,
		generalReportEntries,
		medicalReportEntries,
	} = useLoaderData() as IndexPageLoaderData;

	const submit = useSubmit();

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อและนามสกุล",
			value: (
				<Typography>
					{driver.name} {driver.surname}
				</Typography>
			),
		},
		{
			label: "เบอร์ติดต่อ",
			value: (
				<Typography>{driver.contact}</Typography>
			),
		},
		{
			label: "ประเภทใบขับขี่",
			value: (
				<Typography>
					{driver.license_type}
				</Typography>
			),
		},
		{
			label: "คลังภาพ",
			value: (
				<Gallery
					images={IMAGES}
					onOpenRoot={() => {}}
				/>
			),
		},
	];

	const heading = `ข้อมูลคนขับรถ "${driver.name} ${driver.surname}"`;

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
				ตารางบันทึกเรื่องร้องเรียนคนขับรถ
			</Typography>
			<DriverReportGeneralTable
				entries={generalReportEntries}
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
				ตารางบันทึกผลการตรวจสารเสพติด
			</Typography>
			<DriverReportMedicalTable
				entries={medicalReportEntries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/medical" },
					)
				}
			/>
		</Stack>
	);
};
