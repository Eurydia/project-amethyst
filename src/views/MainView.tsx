import { TypographyTooltip } from "$components/TypographyTooltip";
import {
	AirportShuttleRounded,
	HistoryRounded,
	HomeRounded,
	KeyboardArrowUpRounded,
	PersonRounded,
	SignpostRounded,
} from "@mui/icons-material";
import {
	AppBar,
	Container,
	Fab,
	List,
	ListItem,
	ListItemText,
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
	{
		path: "/",
		label: "หน้าแรก",
		icon: <HomeRounded />,
	},
	{
		path: "/pickup-routes",
		label: "รายชื่อสายรถ",
		icon: <SignpostRounded />,
	},
	{
		path: "/vehicles",
		label: "ทะเบียนรถรับส่ง",
		icon: <AirportShuttleRounded />,
	},
	{
		path: "/drivers",
		label: "รายชื่อคนขับรถ",
		icon: <PersonRounded />,
	},
	{
		path: "/operational-logs",
		label: "ประวัติการเดินรถ",
		icon: <HistoryRounded />,
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
						gap: 2,
						flexDirection: {
							xs: "column",
							sm: "row",
						},
						justifyContent: "space-between",
						alignItems: {
							xs: "flex-start",
							sm: "center",
						},
					}}
				>
					<List
						disablePadding
						dense
						sx={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 2,
						}}
					>
						{PRIMARY_ROUTES.map(
							(route, index) => (
								<ListItem
									key={"route" + index}
									component={Link}
									to={route.path}
									dense
									disableGutters
									disablePadding
									sx={{
										width: "auto",
									}}
								>
									<ListItemText disableTypography>
										<Typography
											sx={{
												display: "flex",
												alignItems: "center",
												gap: 1,
											}}
										>
											{route.icon} {route.label}
										</Typography>
									</ListItemText>
								</ListItem>
							),
						)}
					</List>
					<Typography>{clock}</Typography>
				</Toolbar>
			</AppBar>
			<TypographyTooltip
				arrow
				placement="left"
				title="กลับขึ้นด้านบน"
			>
				<Fab
					disableFocusRipple
					disableRipple
					disableTouchRipple
					size="medium"
					href="#"
					sx={{
						position: "fixed",
						bottom: 16,
						right: 16,
					}}
				>
					<KeyboardArrowUpRounded />
				</Fab>
			</TypographyTooltip>
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
