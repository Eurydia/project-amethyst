import {
	AppBar,
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
		path: "/pickup-routes/report/general",
		label: "สมุดบันทึกเรื่องร้องเรียนสายรถ",
	},
	{
		path: "/vehicles/report/general",
		label: "สมุดบันทึกเรื่องร้องเรียนรถ",
	},
	{
		path: "/vehicles/report/inspection",
		label: "สมุดบันทึกผลการตรวจสภาพรถ",
	},
	{
		path: "/drivers/report/general",
		label: "สมุดบันทึกเรื่องร้องเรียนคนขับรถ",
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
		const roundedHeight = Math.ceil(height) + 20;
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
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Stack
						sx={{
							gap: 1,
							flexDirection: "row",
							flexWrap: "wrap",
						}}
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
						gap: 1,
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
			{/* <TypographyTooltip
				arrow
				placement="left"
				title="กลับขึ้นด้านบน"
			>
				<Fab
					sx={{
						position: "fixed",
						bottom: 16,
						right: 16,
					}}
					size="medium"
					color="primary"
					href="#"
				>
					<KeyboardArrowUpRounded />
				</Fab>
			</TypographyTooltip> */}
			<Container
				maxWidth="lg"
				sx={{
					marginTop: appBarHeight,
				}}
			>
				<Outlet />
			</Container>
		</Fragment>
	);
};
