import { CopiableText } from "$components/CopiableText";
import { DriverReportModelTable } from "$components/DriverReportModelTable";
import { StyledTextWavy } from "$components/StyledTextWavy";
import { TableHeaderDefinition } from "$types/generics";
import { DriverReportModel } from "$types/models";
import {
	AddRounded,
	EditRounded,
	FlagRounded,
	FolderRounded,
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Stack,
	Typography,
} from "@mui/material";
import { filterItems } from "core/filter";
import dayjs from "dayjs";
import { FC } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { DriverInfoPageLoaderData } from "./loader";

const TABLE_HEADERS: TableHeaderDefinition<DriverReportModel>[] =
	[
		{
			key: "datetime_iso",
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime_iso)
					.locale("th")
					.unix() -
				dayjs(b.datetime_iso).locale("th").unix(),
			render: (item) =>
				dayjs(item.datetime_iso)
					.locale("th")
					.format("dd/MMM/YYYY HH:mm น."),
		},
		{
			key: "title",
			label: "เรื่อง",
			compare: () => 0,
			render: (item) => item.title,
		},
		{
			key: "topics",
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: () => 0,
			render: (item) => item.topics,
		},
	];

const filterDriverReportModel = (
	search: string,
	rows: DriverReportModel[],
) => {
	const searchTokens = search
		.normalize()
		.split(" ")
		.map((term) => term.trim())
		.filter((term) => term.length > 0);

	return filterItems(rows, searchTokens, [
		"title",
		"topics",
	]);
};

export const DriverInfoPage: FC = () => {
	const {
		driverData,
		vehicleData,
		driverGeneralReportEntries,
		driverMedicalReportEntries,
	} = useLoaderData() as DriverInfoPageLoaderData;
	const submit = useSubmit();

	const { name, surname } = driverData;

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				ข้อมูลคนขับรถ
			</Typography>
			<Alert
				icon={false}
				severity="info"
			>
				<Typography>
					พ่อสามารถกดที่ข้อความ{" "}
					<StyledTextWavy
						variant="body1"
						variantMapping={{
							body1: "span",
						}}
						display="inline"
					>
						แบบนี้
					</StyledTextWavy>{" "}
					เพื่อคัดลอกเนื้อหาของข้อความได้
				</Typography>
			</Alert>
			<Box>
				<Button
					startIcon={<EditRounded />}
					disableRipple
					disableElevation
					variant="contained"
					onClick={() =>
						submit({}, { action: "./edit" })
					}
				>
					แก้ไขข้อมูลคนขับรถ
				</Button>
			</Box>
			<Stack
				useFlexGap
				spacing={1}
				flexWrap="wrap"
			>
				<Stack
					useFlexGap
					spacing={1}
					direction="row"
					flexWrap="wrap"
					alignItems="baseline"
				>
					<Typography>ชื่อ-นามสกุล:</Typography>
					<CopiableText
						children={`${name} ${surname}`}
					/>
				</Stack>
				<Stack
					useFlexGap
					spacing={1}
					direction="row"
					flexWrap="wrap"
					alignItems="baseline"
				>
					<Typography>เบอร์ติดต่อ:</Typography>
					<CopiableText>
						{driverData.contact}
					</CopiableText>
				</Stack>
				<Typography>
					ประเภทใบขับขี่:{" "}
					{driverData.license_type}
				</Typography>
				<Stack
					spacing={1}
					direction="row"
					useFlexGap
					flexWrap="wrap"
					alignItems="baseline"
				>
					<Typography>รถที่มอบหมาย:</Typography>
					{vehicleData === null ? (
						"ไม่มีรถที่ได้รับมอบหมาย"
					) : (
						<Typography
							to={
								"/vehicles/id/" + vehicleData.id
							}
							component={Link}
							display="flex"
							flexDirection="row"
							flexWrap="wrap"
							alignItems="center"
							justifyContent="flex-end"
						>
							{vehicleData.license_plate}
						</Typography>
					)}
				</Stack>
			</Stack>
			<Typography variant="h2">
				ประวัติผลการตรวจสารเสพติด
			</Typography>
			<DriverReportModelTable
				slotToolbar={
					<Button
						startIcon={<AddRounded />}
						disableElevation
						variant="contained"
						onClick={() =>
							submit(
								{},
								{ action: "./report/medical" },
							)
						}
					>
						บันทึกผลการตรวจสารเสพติด
					</Button>
				}
				rows={driverMedicalReportEntries}
				label="ประวัติการตรวจสารเสพติด"
				headers={TABLE_HEADERS}
				defaultSortOrder="asc"
				defaultSortBy="datetime_iso"
				filterFn={filterDriverReportModel}
			/>
			<Typography variant="h2">
				ประวัติการร้องเรียน
			</Typography>
			<DriverReportModelTable
				slotToolbar={
					<Button
						startIcon={<FlagRounded />}
						disableElevation
						variant="contained"
						onClick={() =>
							submit(
								{},
								{ action: "./report/general" },
							)
						}
					>
						รายงานปัญหาคนขับรถ
					</Button>
				}
				rows={driverGeneralReportEntries}
				label="ประวัติการร้องเรียน"
				headers={TABLE_HEADERS}
				defaultSortOrder="asc"
				defaultSortBy="datetime_iso"
				filterFn={filterDriverReportModel}
			/>
			<Gallery />
		</Stack>
	);
};

const images = [
	{
		label: "ภาพด้านหน้า",
		imgPath:
			"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=20",
	},
	{
		label: "ภาพด้านซ้าย",
		imgPath:
			"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&q=20",
	},
	{
		label: "ภาพด้านขวา",
		imgPath:
			"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=20",
	},
	{
		label: "ภาพด้านหลัง",
		imgPath:
			"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=20",
	},
];

const Gallery = () => {
	const openInTauri = () => {};

	return (
		<Stack spacing={1}>
			<Typography variant="h2">
				ภาพประกอบ
			</Typography>
			<Box>
				<Button
					variant="contained"
					disableElevation
					startIcon={<FolderRounded />}
				>
					จัดการรูปภาพ
				</Button>
			</Box>
			<Stack
				direction="row"
				overflow="auto"
				width="100%"
				spacing={1}
				useFlexGap
				flexWrap="wrap"
			>
				{images.map(
					({ label, imgPath }, index) => (
						<Box
							onClick={openInTauri}
							key={"item" + index}
							component="img"
							src={imgPath}
							alt={label}
							sx={{
								width: 200,
								objectPosition: "50% 50%",
								aspectRatio: "1/1",
								objectFit: "cover",
							}}
						/>
					),
				)}
			</Stack>
		</Stack>
	);
};
