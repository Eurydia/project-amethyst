import { TableHeaderDefinition } from "$types/generics";
import { DriverReportModel } from "$types/models";
import {
	EditRounded,
	FolderRounded,
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Container,
	List,
	ListItem,
	ListItemText,
	Stack,
	styled,
	Toolbar,
	Typography,
	TypographyProps,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { DriverInfoPageLoaderData } from "./loader";
import { toast } from "react-toastify";
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

type InfoItemProps = {
	label: string;
	value: ReactNode;
};
const InfoItem: FC<InfoItemProps> = (props) => {
	const { label, value } = props;
	return (
		<Stack
			spacing={1}
			direction="row"
			flexWrap="wrap"
			useFlexGap
		>
			<Typography>{label}</Typography>
			{value}
		</Stack>
	);
};

const StyledTypography = styled(Typography)({
	textDecorationThickness: "from-font",
	textDecorationLine: "underline",
	textDecorationStyle: "wavy",
	cursor: "pointer",
});

type GalleryProps = {
	images: string[];
};
const Gallery: FC<GalleryProps> = (props) => {
	const { images } = props;
	return (
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
						maxWidth: "200px",
						objectPosition: "50% 50%",
						aspectRatio: "1/1",
						objectFit: "cover",
					}}
				/>
			))}
		</Stack>
	);
};

export const DriverInfoPage: FC = () => {
	const { driverData } =
		useLoaderData() as DriverInfoPageLoaderData;
	const submit = useSubmit();

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
			<Toolbar
				variant="dense"
				disableGutters
				sx={{
					gap: 1,
					flexWrap: "wrap",
					flexDirection: "row",
				}}
			>
				<Button
					variant="outlined"
					disableElevation
					startIcon={<EditRounded />}
					onClick={() =>
						submit({}, { action: "./edit" })
					}
				>
					แก้ไขข้อมูล
				</Button>
				<Button
					variant="outlined"
					disableElevation
					startIcon={<FolderRounded />}
				>
					เปิดแฟ้มภาพ
				</Button>
			</Toolbar>
			<Stack spacing={2}>
				<InfoItem
					label="ชื่อและนามสกุล:"
					value={
						<StyledTypography
							onClick={() => {
								window.navigator.clipboard.writeText(
									`${driverData.name} ${driverData.surname}`,
								);
								toast.info(
									"คัดลอกชื่อและนามสกุลแล้ว",
								);
							}}
						>
							{driverData.name}{" "}
							{driverData.surname}
						</StyledTypography>
					}
				/>
				<InfoItem
					label="เบอร์ติดต่อ:"
					value={
						<StyledTypography
							onClick={() => {
								window.navigator.clipboard.writeText(
									`${driverData.name} ${driverData.surname}`,
								);
								toast.info(
									"คัดลอกเบอร์ติดต่อแล้ว",
								);
							}}
						>
							{driverData.contact}
						</StyledTypography>
					}
				/>
				<InfoItem
					label="ประเภทของใบขับขี่:"
					value={driverData.license_type}
				/>
			</Stack>
			<Gallery images={IMAGES} />
		</Stack>
	);
};
