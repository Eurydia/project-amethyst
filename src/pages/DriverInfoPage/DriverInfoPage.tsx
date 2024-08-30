import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalButton } from "$components/DriverReportMedicalButton";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { Gallery } from "$components/Gallery";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { TypographyAlert } from "$components/TypographyAlert";
import { TypographyButton } from "$components/TypographyButton";
import { EditRounded } from "@mui/icons-material";
import {
	alpha,
	Fab,
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
import { TypographyTooltip } from "$components/TypographyTooltip";
import { FormalLayout } from "$layouts/FormalLayout";

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

const StyledTypography = styled(Typography)({
	textDecorationThickness: "from-font",
	textDecorationLine: "underline",
	textDecorationStyle: "wavy",
	cursor: "pointer",
});

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

export const DriverInfoPage: FC = () => {
	const {
		driver,
		driverOptions,
		topicOptions,
		operationalLogEntries,
		generalReportEntries,
		medicalReportEntries,
	} = useLoaderData() as DriverInfoPageLoaderData;

	const submit = useSubmit();

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "คลังภาพ",
			value: (
				<Gallery
					onOpenRoot={() => {}}
					images={IMAGES}
				/>
			),
		},
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
			<TypographyTooltip
				title="แก้ไขข้อมูลคนขับรถ"
				placement="left"
				arrow
			>
				<Fab
					color="primary"
					size="medium"
					sx={{
						position: "fixed",
						bottom: 72,
						right: 16,
					}}
					onClick={() =>
						submit(
							{},
							{
								action: "./edit",
							},
						)
					}
				>
					<EditRounded />
				</Fab>
			</TypographyTooltip>
			<FormalLayout>{infoItems}</FormalLayout>

			<Typography
				variant="h2"
				id="operational-log"
			>
				ประวัติการเดินรถ
			</Typography>
			<Toolbar
				variant="dense"
				disableGutters
			>
				<TypographyButton variant="outlined">
					TBA
				</TypographyButton>
			</Toolbar>
			<OperationalLogTable
				entries={operationalLogEntries}
				drivers={[driver]}
				disableDriverFilterSelection
			/>
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
			<DriverReportGeneralTable
				entries={generalReportEntries}
				driverOptions={driverOptions}
				topicOptions={topicOptions}
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
			<DriverReportMedicalTable
				driverOptions={driverOptions}
				topicOptions={topicOptions}
				entries={medicalReportEntries}
			/>
		</Stack>
	);
};
