import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportMedicalButton } from "$components/DriverReportMedicalButton";
import { DriverReportTable } from "$components/DriverReportTable";
import { TypographyAlert } from "$components/TypographyAlert";
import { TypographyButton } from "$components/TypographyButton";
import { useDriverGeneralReportHeaders } from "$hooks/useDriverGeneralReportHeaders";
import { useDriverMedicalReportHeaders } from "$hooks/useDriverMedicalReportHeaders";
import {
	EditRounded,
	FolderRounded,
} from "@mui/icons-material";
import {
	alpha,
	Grid,
	List,
	ListItem,
	ListItemText,
	Stack,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
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
		<Fragment>
			<Toolbar
				variant="dense"
				disableGutters
			>
				<TypographyButton
					variant="outlined"
					startIcon={<FolderRounded />}
				>
					เปิดแฟ้มภาพ
				</TypographyButton>
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
							maxWidth: "200px",
							objectPosition: "50% 50%",
							aspectRatio: "1/1",
							objectFit: "cover",
						}}
					/>
				))}
			</Stack>
		</Fragment>
	);
};

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
		</Fragment>
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

	const generalReportHeaders =
		useDriverGeneralReportHeaders();
	const medicalReportHeaders =
		useDriverMedicalReportHeaders();

	const submit = useSubmit();

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อและนามสกุล",
			value: (
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
			),
		},
		{
			label: "เบอร์ติดต่อ",
			value: (
				<StyledTypography
					onClick={() => {
						window.navigator.clipboard.writeText(
							driver.contact,
						);
						toast.info("คัดลอกเบอร์ติดต่อแล้ว");
					}}
				>
					{driver.contact}
				</StyledTypography>
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
	];

	const renderedInfoItems = infoItems.map(
		(item, index) => (
			<Grid
				container
				item
				key={"info" + index}
				sx={{
					paddingY: 2,
					backgroundColor: (theme) =>
						alpha(
							index % 2 === 0
								? theme.palette.primary.main
								: theme.palette.common.white,
							0.05,
						),
				}}
			>
				<Grid
					item
					xs={12}
					sm={3}
				>
					<Typography
						fontWeight="bold"
						width={200}
					>
						{item.label}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={9}
				>
					{item.value}
				</Grid>
			</Grid>
		),
	);

	return (
		<Stack spacing={1}>
			<TableOfContents />
			<Typography
				variant="h1"
				id="info"
			>
				ข้อมูลคนขับรถ
			</Typography>
			<TypographyAlert severity="info">
				TBA
			</TypographyAlert>
			<Toolbar
				variant="dense"
				disableGutters
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
			</Toolbar>
			<Grid container>{renderedInfoItems}</Grid>
			<Gallery images={IMAGES} />
			<Typography
				variant="h2"
				id="general-report"
			>
				ประวัติการร้องเรียน
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
				headers={generalReportHeaders}
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
				ผลการตรวจสารเสพติด
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
				headers={medicalReportHeaders}
				entries={medicalReportEntries}
				defaultSortBy="datetime_iso"
				defaultSortOrder="desc"
				driverOptions={driverOptions}
				topicOptions={topicOptions}
				searchPlaceholder="ค้นหาผลการตรวจสารเสพติด"
			/>
		</Stack>
	);
};
