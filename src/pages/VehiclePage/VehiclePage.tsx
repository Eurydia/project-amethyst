import { FC } from "react";
import { VehiclePageLoaderData } from "./loader";
import {
	Link,
	useLoaderData,
} from "react-router-dom";
import {
	Box,
	Button,
	List,
	ListItem,
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

export const VehiclePage: FC = () => {
	const { vehicleId } =
		useLoaderData() as VehiclePageLoaderData;

	return (
		<Stack>
			<Typography variant="h1">
				เลขทะเบียน "{vehicleId}"
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
						primary="เลขทะเบียน"
						secondary={vehicleId}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary="จังหวัด"
						secondary="กรุงเทพมหานคร"
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary="หจก"
						secondary="สี่พี่น้อง"
					/>
				</ListItem>
			</List>
			<Typography variant="h3">
				ประวัติการตรวจสภาพ
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>เวลาและวันที่</TableCell>
							<TableCell>กล้องหน้ารถ</TableCell>
							<TableCell>เข็มขัดนิรภัย</TableCell>
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
			<Typography variant="h3">
				ประวัติอดีตคนขับรถ
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ชื่อ</TableCell>
							<TableCell>วันเริ่มขับ</TableCell>
							<TableCell>วันเลิกขับ</TableCell>
							<TableCell>หมายเหตุ</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								<Link to="/driver/สมเดช">
									นายสมเดช
								</Link>
							</TableCell>
							<TableCell>09 ธ.ค. 2567</TableCell>
							<TableCell>12 ธ.ค. 2567</TableCell>
							<TableCell>คนขับปัจจุบัน</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>นายแดง</TableCell>
							<TableCell>01 ธ.ค. 2567</TableCell>
							<TableCell>09 ธ.ค. 2567</TableCell>
							<TableCell>ครบกำหนดสัญญา</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Typography variant="h3">
				ประวัติสายรถ
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ชื่อสาย</TableCell>
							<TableCell>วันเริ่มขับ</TableCell>
							<TableCell>วันเลิกขับ</TableCell>
							<TableCell>หมายเหตุ</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>สายอยุธา-ภาชี</TableCell>
							<TableCell>09 ธ.ค. 2567</TableCell>
							<TableCell>12 ธ.ค. 2567</TableCell>
							<TableCell>สายปัจจุบัน</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								สายอยุธา-อ่างทอง
							</TableCell>
							<TableCell>01 ธ.ค. 2567</TableCell>
							<TableCell>09 ธ.ค. 2567</TableCell>
							<TableCell>ครบกำหนดสัญญา</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>

			<List
				disablePadding
				subheader={
					<ListSubheader
						disableGutters
						disableSticky
					>
						<Typography variant="h3">
							เอกสาราชการ
						</Typography>
					</ListSubheader>
				}
			>
				<ListItem>
					<ListItemText primary="พรบ (pdf)" />
				</ListItem>
				<ListItem>
					<ListItemText primary="ภาษี" />
				</ListItem>
			</List>

			<Gallery />
		</Stack>
	);
};
