import { FC } from "react";
import { DriverPageLoaderData } from "./loader";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import {
	CopyAllRounded,
	DriveEtaTwoTone,
	FolderRounded,
	Launch,
	OpenInNew,
} from "@mui/icons-material";
import { toast } from "react-toastify";

export const DriverPage: FC = () => {
	const { driverData, vehicleData } =
		useLoaderData() as DriverPageLoaderData;
	const submit = useSubmit();

	const { name, surname } = driverData;

	const handleCopyContact = () => {
		navigator.clipboard.writeText(
			driverData.contact,
		);
		toast.info("คัดลอกเบอร์โทรศัพท์แล้ว", {
			icon: false,
		});
	};

	return (
		<Stack spacing={2}>
			<Typography
				fontSize="x-large"
				fontWeight="bold"
			>
				ข้อมูลคนขับรถ
			</Typography>
			<Typography variant="h1">
				{name} {surname}
			</Typography>
			<Box>
				<Button
					disableElevation
					disableRipple
					variant="contained"
				>
					แก้ไขข้อมูล
				</Button>
			</Box>
			<Typography variant="h2">
				ข้อมูลทั่วไป
			</Typography>
			<Stack
				useFlexGap
				spacing={1}
				flexWrap="wrap"
			>
				<Typography>
					ชื่อ-สกุล: {name} {surname}
				</Typography>
				<Stack
					spacing={1}
					direction="row"
					useFlexGap
					flexWrap="wrap"
					alignItems="baseline"
				>
					<Typography>เบอร์โทรศัพท์:</Typography>
					<Typography
						display="flex"
						flexDirection="row"
						flexWrap="wrap"
						alignItems="baseline"
						onClick={handleCopyContact}
						sx={{
							cursor: "pointer",
							textDecorationLine: "underline",
						}}
					>
						{driverData.contact}
						<CopyAllRounded fontSize="inherit" />
					</Typography>
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
							<Launch fontSize="inherit" />
						</Typography>
					)}
				</Stack>
			</Stack>
			<Typography variant="h2">
				ประวัติการตรวจสารเสพติด
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>เวลาและวันที่</TableCell>
							<TableCell>สถานะ</TableCell>
							<TableCell>หมายเหตุ</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								09 ก.ย. 2567 10:00 น.
							</TableCell>
							<TableCell>
								ไม่พบสารเสพติด
							</TableCell>
							<TableCell>-</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Typography variant="h3">
				ประวัติการร้องเรียน
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>เวลาและวันที่</TableCell>
							<TableCell>เรื่อง</TableCell>
							<TableCell>ผู้รับผิดชอบ</TableCell>
							<TableCell>...</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								09 ก.ย. 2567 10:00
							</TableCell>
							<TableCell>ปกติ</TableCell>
							<TableCell>
								ที่นั่งที่สองจากด้านหน้ามีการชำรุด
							</TableCell>
							<TableCell>...</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
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
