import { CopiableText } from "$components/CopiableText";
import { TableHeaderDefinition } from "$types/generics";
import { DriverReportModel } from "$types/models";
import {
	EditRounded,
	FolderRounded,
} from "@mui/icons-material";
import {
	Alert,
	Button,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { DriverInfoPageLoaderData } from "./loader";
import { DriverReportTable } from "$components/DriverReportTable";
import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportMedicalButton } from "$components/DriverReportMedicalButton";

const TABLE_HEADERS: TableHeaderDefinition<DriverReportModel>[] =
	[
		{
			key: "datetime_iso",
			label: "วัน-เวลา",
			compare: (a, b) =>
				dayjs(a.datetime_iso).unix() -
				dayjs(b.datetime_iso).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime_iso).format(
						"HH:mm น. DD/MM/YYYY ",
					)}
				</Typography>
			),
		},
		{
			key: "title",
			label: "เรื่อง",
			compare: null,
			render: (item) => (
				<Typography>{item.title}</Typography>
			),
		},
		{
			key: "topics",
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) => (
				<Typography>{item.topics}</Typography>
			),
		},
	];

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
				<DriverReportMedicalButton
					path="./report/medical"
					variant="contained"
				/>
				<DriverReportTable
					rows={driverMedicalReportEntries}
					searchKeys={["title", "topics"]}
					searchPlaceholder="ค้นหาประวัติการตรวจสารเสพติด"
					headers={TABLE_HEADERS}
					defaultSortOrder="asc"
					defaultSortBy="datetime_iso"
				/>
			</Stack>
			<Stack spacing={1}>
				<Typography variant="h2">
					ประวัติการร้องเรียน
				</Typography>
				<DriverReportGeneralButton
					path="./report/general"
					variant="contained"
				/>
				<DriverReportTable
					rows={driverGeneralReportEntries}
					searchPlaceholder="ค้นหาประวัติการร้องเรียน"
					headers={TABLE_HEADERS}
					defaultSortOrder="asc"
					defaultSortBy="datetime_iso"
					searchKeys={["title", "topics"]}
				/>
			</Stack>
		</Stack>
	);
};
