import {
	AppBar,
	Box,
	Container,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
	FC,
	Fragment,
	useEffect,
	useState,
} from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const CLOCK_FORMAT =
	"HH:mm น., วันddddที่ D MMMM YYYY ";

const PRIMARY_ROUTES = [
	{ path: "/", label: "หน้าแรก" },
	{
		path: "pickup-routes",
		label: "สมุดบันสายรถ",
	},
	{
		path: "vehicles",
		label: "สมุดบันทึกทะเบียนรถ",
	},
	{
		path: "drivers",
		label: "รายชื่อคนขับรถ",
	},
];
const SECONDARY_ROUTES = [
	{
		path: "/drivers/report/general",
		label: "สมุดบันทึกประวัติการรายงานคนขับรถ",
	},
	{
		path: "/drivers/report/medical",
		label: "สมุดบันทึกผลการตรวจสารเสพติด",
	},
];

export const MainView: FC = () => {
	const [clock, setClock] = useState(
		dayjs().locale("th").format(CLOCK_FORMAT),
	);

	useEffect(() => {
		const id = setInterval(() => {
			setClock(
				dayjs().locale("th").format(CLOCK_FORMAT),
			);
		}, 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<Box>
			<ToastContainer />
			<AppBar
				enableColorOnDark
				color="default"
				elevation={0}
				sx={{
					zIndex: (theme) =>
						theme.zIndex.drawer + 1,
				}}
			>
				<Toolbar
					variant="dense"
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Stack
						direction="row"
						spacing={1}
						useFlexGap
						flexWrap="wrap"
						divider={
							<Divider
								flexItem
								orientation="vertical"
							/>
						}
					>
						{PRIMARY_ROUTES.map((route) => (
							<Link
								to={route.path}
								key={"prim-route" + route.path}
							>
								<Typography>
									{route.label}
								</Typography>
							</Link>
						))}
					</Stack>
					<Typography>{clock}</Typography>
				</Toolbar>
				<Divider flexItem />
			</AppBar>
			<Container maxWidth="md">
				<Box marginTop={8}>
					<Paper
						elevation={0}
						sx={{
							padding: 4,
						}}
					>
						<Outlet />
					</Paper>
				</Box>
			</Container>
		</Box>
	);
};
