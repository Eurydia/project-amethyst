import { AttendanceLogTable } from "$components/AttendanceLogTable";
import { prepareQueryParam } from "$core/query-param";
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
		label: "ตารางบันทึกผลการตรวจสถาพรถรับส่ง",
	},
	{
		path: "/pickup-routes/report/general",
		label: "ตารางบันทึกเรื่องร้องเรียนสายรถ",
	},
];

export const HomePage: FC = () => {
	const { logEntries } =
		useLoaderData() as HomePageLoaderData;

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
						dense
						disableGutters
						disablePadding
					>
						<ListItemText disableTypography>
							<Typography
								component={Link}
								to={{
									pathname: route.path,
									search: prepareQueryParam(
										"/",
										"หน้าแรก",
									),
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
			<AttendanceLogTable entries={logEntries} />
		</Stack>
	);
};
