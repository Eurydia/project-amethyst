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
import { DriveEtaTwoTone } from "@mui/icons-material";

export const DriverPage: FC = () => {
	const { driverData, vehicleData } =
		useLoaderData() as DriverPageLoaderData;
	const submit = useSubmit();

	const { name, surname } = driverData;

	return (
		<Stack>
			<Typography variant="h1">
				ข้อมูลคนขับ "{name} {surname}"
			</Typography>
			<List
				disablePadding
				subheader={
					<ListSubheader
						disableGutters
						disableSticky
					>
						<Typography variant="h2">
							ข้อมูลทั่วไป
						</Typography>
					</ListSubheader>
				}
			>
				<ListItem>
					<ListItemText
						primary="ชื่อ-สกุล"
						secondary={`${name} ${surname}`}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary="เบอร์โทรศัพท์"
						secondary={driverData.contact}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary="รถที่มอบหมาย"
						secondary={
							vehicleData === null ? (
								"ไม่มีรถที่ได้รับมอบหมาย"
							) : (
								<Link
									to={
										"/vehicles/" + vehicleData.id
									}
								>
									{vehicleData.license_plate}
								</Link>
							)
						}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary="ประเภทใบขับขี่"
						secondary={driverData.license_type}
					/>
				</ListItem>
			</List>
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
		<Box>
			<Typography variant="h2">
				ภาพประกอบ
			</Typography>
			<Button variant="contained">
				เพิ่มรูปภาพ
			</Button>
			<Stack
				direction="row"
				overflow="auto"
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
		</Box>
	);
};
