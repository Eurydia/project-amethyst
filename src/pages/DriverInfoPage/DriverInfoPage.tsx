import { CopiableText } from "$components/CopiableText";
import { DriverReportModelTable } from "$components/DriverReportModelTable";
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
	Divider,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { filterItems } from "core/filter";
import dayjs from "dayjs";
import { FC } from "react";
import {
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
				dayjs(a.datetime_iso).unix() -
				dayjs(b.datetime_iso).unix(),
			render: (item) =>
				dayjs(item.datetime_iso).format(
					"dd/MMM/YYYY HH:mm น.",
				),
		},
		{
			key: "title",
			label: "เรื่อง",
			compare: null,
			render: (item) => item.title,
		},
		{
			key: "topics",
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
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

const IMAGES = [
	"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=20",
	"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=20",
];

type GalleryProps = {
	images: string[];
};
const Gallery: FC<GalleryProps> = (props) => {
	const { images } = props;
	return (
		<Stack spacing={1}>
			<Toolbar
				disableGutters
				variant="dense"
			>
				<Button
					variant="contained"
					disableElevation
					startIcon={<FolderRounded />}
				>
					เปิดคลังภาพ
				</Button>
			</Toolbar>
			<Stack
				direction="row"
				overflow="auto"
				width="100%"
				spacing={1}
				useFlexGap
				flexWrap="nowrap"
			>
				{images.map((image, index) => (
					<img
						key={"gallery" + index}
						src={image}
						width="33%"
						style={{
							objectPosition: "50% 50%",
							aspectRatio: "1/1",
							objectFit: "cover",
						}}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export const DriverInfoPage: FC = () => {
	const {
		driverData,
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
				severity="info"
				icon={false}
			>
				<Typography>TBA</Typography>
			</Alert>
			<Stack spacing={1}>
				<Toolbar
					variant="dense"
					disableGutters
				>
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
				</Toolbar>
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
				</Stack>
				<Gallery images={IMAGES} />
			</Stack>
			<Stack spacing={1}>
				<Typography variant="h2">
					ประวัติการตรวจสารเสพติด
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
			</Stack>
			<Stack spacing={1}>
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
			</Stack>
		</Stack>
	);
};
