import {
	AppBar,
	Box,
	Container,
	Divider,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
	FC,
	Fragment,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, Outlet } from "react-router-dom";

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
		label: "ประวัติการร้องเรียนคนขับรถ",
	},
	{
		path: "/drivers/report/medical",
		label: "สมุดบันทึกผลการตรวจสารเสพติด",
	},
];

export const MainView: FC = () => {
	const appBarRef = useRef<HTMLElement | null>(
		null,
	);
	const [appBarHeight, setAppBarHeight] =
		useState("0px");

	const [clock, setClock] = useState(
		dayjs().locale("th").format(CLOCK_FORMAT),
	);

	useEffect(() => {
		if (appBarRef.current === null) {
			return;
		}
		const height =
			appBarRef.current.getBoundingClientRect()
				.height;
		const roundedHeight = Math.ceil(height);
		const heightInPx = `${roundedHeight}px`;
		setAppBarHeight(heightInPx);
	}, [appBarRef]);

	useEffect(() => {
		const id = setInterval(() => {
			setClock(
				dayjs().locale("th").format(CLOCK_FORMAT),
			);
		}, 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<Fragment>
			<AppBar
				ref={appBarRef}
				elevation={0}
				variant="outlined"
				color="default"
			>
				<Toolbar
					variant="dense"
					sx={{
						flexWrap: "wrap",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Stack
						useFlexGap
						spacing={2}
						flexDirection="row"
						flexWrap="wrap"
					>
						{PRIMARY_ROUTES.map(
							(route, index) => (
								<Typography
									key={"route" + index}
									component={Link}
									to={route.path}
								>
									{route.label}
								</Typography>
							),
						)}
					</Stack>
					<Typography>{clock}</Typography>
				</Toolbar>
				<Divider flexItem />
				<Toolbar
					variant="dense"
					sx={{
						flexWrap: "wrap",
						flexDirection: "row",
						gap: 2,
					}}
				>
					{SECONDARY_ROUTES.map(
						(route, index) => (
							<Typography
								key={"route" + index}
								component={Link}
								to={route.path}
							>
								{route.label}
							</Typography>
						),
					)}
				</Toolbar>
			</AppBar>
			<Container maxWidth="md">
				<Box
					marginTop={appBarHeight}
					paddingY={2}
				>
					<Outlet />
				</Box>
			</Container>
		</Fragment>
	);
};
