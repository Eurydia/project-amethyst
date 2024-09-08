import { AttendanceLogTable } from "$components/AttendanceLogTable";
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import {
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { FC } from "react";
import {
	Link,
	useLoaderData,
} from "react-router-dom";
import { HomePageLoaderData } from "./loader";

const ROUTES = [
	{
		path: "/drivers/report/general",
		label: "ตารางบันทึกเรื่องร้องเรียนคนขับรถ",
	},
	{
		path: "/drivers/report/medical",
		label: "ตารางบันทึกผลการตรวจสารเสพติด",
	},
	{
		path: "/vehicles/report/general",
		label: "ตารางบันทึกเรื่องร้องเรียนรถรับส่ง",
	},
	{
		path: "/vehicles/report/inspection",
		label: "ตารางบันทึกผลการตรวจสถาพรถ",
	},
	{
		path: "/pickup-routes/report/general",
		label: "ตารางบันทึกเรื่องร้องเรียนสายรถ",
	},
];

export const HomePage: FC = () => {
	const {
		logEntries,
		driverMultiSelectOptions,
		vehicleMultiSelectOptions,
		routeMultiSelectOptions,
	} = useLoaderData() as HomePageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				หน้าแรก
			</Typography>
			<Typography fontWeight="bold">
				ทางลัด
			</Typography>
			<List
				disablePadding
				dense
				sx={{ width: "fit-content" }}
			>
				{ROUTES.map((route, index) => (
					<ListItem
						key={"route" + index}
						component={Link}
						to={route.path}
						dense
						disableGutters
						disablePadding
					>
						<ListItemText disableTypography>
							<Typography
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1,
								}}
							>
								<KeyboardArrowRightRounded />
								{route.label}
							</Typography>
						</ListItemText>
					</ListItem>
				))}
			</List>
			<Typography variant="h2">
				สมุดบันทึกเวลารับเข้าและรับออก
			</Typography>
			<AttendanceLogTable
				entries={logEntries}
				slotProps={{
					driverMultiSelect: {
						options: driverMultiSelectOptions,
					},
					vehicleMultiSelect: {
						options: vehicleMultiSelectOptions,
					},
					routeMultiSelect: {
						options: routeMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
