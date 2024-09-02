import { BaseDetails } from "$components/BaseDetails";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { Gallery } from "$components/Gallery";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";
import { BaseTOC } from "$components/BaseTOC";
import {
	DriverModel,
	DriverReportEntry,
} from "$types/models/Driver";
import { OperationalLogEntry } from "$types/models/OperatonalLog";

const TOC_PATHS: {
	label: string;
	href: string;
}[] = [
	{
		label: "ข้อมูลคนขับรถ",
		href: "#info",
	},
	{
		label: "ประวัติการเดินรถ",
		href: "#operational-log",
	},
	{
		label: "เรื่องร้องเรียน",
		href: "#report-general",
	},
	{
		label: "ผลการตรวจสารเสพติด",
		href: "#report-medical",
	},
];

type CustomDetailsProps = {
	images: string[];
	driver: DriverModel;
};
const CustomDetails: FC<CustomDetailsProps> = (
	props,
) => {
	const { images, driver } = props;
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
					images={images}
					onOpenRoot={() => {}}
				/>
			),
		},
	];
	return (
		<BaseDetails
			onEdit={() =>
				submit(
					{},
					{
						action: "./edit",
					},
				)
			}
		>
			{infoItems}
		</BaseDetails>
	);
};

type CustomLogTableProps = {
	entries: OperationalLogEntry[];
};
const CustomLogTable: FC<CustomLogTableProps> = (
	props,
) => {
	const { entries } = props;
	return (
		<Fragment>
			<Typography
				variant="h2"
				id="operational-log"
			>
				ตารางบันทึกประวัติการเดินรถ
			</Typography>
			<OperationalLogTable
				entries={entries}
				onAdd={() => {}}
			/>
		</Fragment>
	);
};

type CustomGeneralReportTableProps = {
	entries: DriverReportEntry[];
};
const CustomGeneralReportTable: FC<
	CustomGeneralReportTableProps
> = (props) => {
	const { entries } = props;
	const submit = useSubmit();
	return (
		<Fragment>
			<Typography
				variant="h2"
				id="report-general"
			>
				ตารางบันทึกเรื่องร้องเรียน
			</Typography>
			<DriverReportGeneralTable
				entries={entries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/general" },
					)
				}
			/>
		</Fragment>
	);
};

type CustomMedicalReportTableProps = {
	entries: DriverReportEntry[];
};
const CustomMedicalReportTable: FC<
	CustomMedicalReportTableProps
> = (props) => {
	const { entries } = props;
	const submit = useSubmit();

	return (
		<Fragment>
			<Typography
				variant="h2"
				id="report-medical"
			>
				ตารางบันทึกผลการตรวจสารเสพติด
			</Typography>
			<DriverReportMedicalTable
				entries={entries}
				onAdd={() =>
					submit(
						{},
						{ action: "./report/medical" },
					)
				}
			/>
		</Fragment>
	);
};

export const IndexPage: FC = () => {
	const {
		images,
		driver,
		logEntries,
		generalEntries,
		medicalEntries,
	} = useLoaderData() as IndexPageLoaderData;

	const heading = `ข้อมูลของ "${driver.name} ${driver.surname}"`;

	return (
		<Stack spacing={1}>
			<BaseTOC>{TOC_PATHS}</BaseTOC>
			<Typography
				variant="h1"
				id="info"
			>
				{heading}
			</Typography>
			<CustomDetails
				images={images}
				driver={driver}
			/>
			<CustomLogTable entries={logEntries} />
			<CustomGeneralReportTable
				entries={generalEntries}
			/>
			<CustomMedicalReportTable
				entries={medicalEntries}
			/>
		</Stack>
	);
};
