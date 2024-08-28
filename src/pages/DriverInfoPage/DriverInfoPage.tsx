import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportMedicalButton } from "$components/DriverReportMedicalButton";
import { DriverReportTable } from "$components/DriverReportTable";
import { TypographyAlert } from "$components/TypographyAlert";
import { TypographyButton } from "$components/TypographyButton";
import {
	EditRounded,
	FolderRounded,
} from "@mui/icons-material";
import {
	List,
	ListItem,
	ListItemText,
	Stack,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverInfoPageLoaderData } from "./loader";

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
	const {
		driver,
		topicOptions,
		driverOptions,
		generalReportEntries,
		medicalReportEntries,
	} = useLoaderData() as DriverInfoPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
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
								ตารางบันทึกประวัติการร้องเรียน
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
								ตารางบันทึกผลการตรวจสารเสพติด
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</List>
			<Typography
				variant="h1"
				id="info"
			>
				ข้อมูลคนขับรถ
			</Typography>
			<TypographyAlert
				severity="info"
				icon={false}
			>
				TBA
			</TypographyAlert>
			<Toolbar
				variant="dense"
				disableGutters
				sx={{
					gap: 1,
					flexWrap: "wrap",
					flexDirection: "row",
				}}
			>
				<TypographyButton
					variant="outlined"
					startIcon={<EditRounded />}
					onClick={() =>
						submit({}, { action: "./edit" })
					}
				>
					แก้ไขข้อมูล
				</TypographyButton>
				<TypographyButton
					variant="outlined"
					startIcon={<FolderRounded />}
				>
					เปิดแฟ้มภาพ
				</TypographyButton>
			</Toolbar>
			<Stack spacing={2}>
				<InfoItem
					label="ชื่อและนามสกุล:"
					value={
						<StyledTypography
							onClick={() => {
								window.navigator.clipboard.writeText(
									`${driver.name} ${driver.surname}`,
								);
								toast.info(
									"คัดลอกชื่อและนามสกุลแล้ว",
								);
							}}
						>
							{driver.name} {driver.surname}
						</StyledTypography>
					}
				/>
				<InfoItem
					label="เบอร์ติดต่อ:"
					value={
						<StyledTypography
							onClick={() => {
								window.navigator.clipboard.writeText(
									`${driver.name} ${driver.surname}`,
								);
								toast.info(
									"คัดลอกเบอร์ติดต่อแล้ว",
								);
							}}
						>
							{driver.contact}
						</StyledTypography>
					}
				/>
				<InfoItem
					label="ประเภทของใบขับขี่:"
					value={driver.license_type}
				/>
			</Stack>
			<Gallery images={IMAGES} />
			<Typography
				variant="h2"
				id="general-report"
			>
				ตารางบันทึกประวัติการร้องเรียน
			</Typography>
			<Toolbar
				variant="dense"
				disableGutters
			>
				<DriverReportGeneralButton
					variant="contained"
					path="./report/general"
				/>
			</Toolbar>
			<DriverReportTable
				entries={generalReportEntries}
				defaultSortBy="datetime_iso"
				defaultSortOrder="desc"
				driverOptions={driverOptions}
				topicOptions={topicOptions}
				searchPlaceholder="ค้นหาประวัติการร้องเรียน"
			/>
			<Typography
				variant="h2"
				id="medical-report"
			>
				ตารางบันทึกผลการตรวจสารเสพติด
			</Typography>
			<Toolbar
				variant="dense"
				disableGutters
			>
				<DriverReportMedicalButton
					variant="contained"
					path="./report/medical"
				/>
			</Toolbar>
			<DriverReportTable
				entries={medicalReportEntries}
				defaultSortBy="datetime_iso"
				defaultSortOrder="desc"
				driverOptions={driverOptions}
				topicOptions={topicOptions}
				searchPlaceholder="ค้นหาประวัติการตรวจสารเสพติด"
			/>
		</Stack>
	);
};
