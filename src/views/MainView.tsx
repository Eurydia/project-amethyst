import {
	AppBar,
	Box,
	Container,
	Divider,
	Paper,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
	FC,
	lazy,
	useEffect,
	useState,
} from "react";
import { Link, Outlet } from "react-router-dom";
import { AddressBar } from "../components/AddressBar";

const ROUTES = [
	{ path: "/", label: "Home" },
	{ path: "pickup-routes", label: "Routes" },
	{ path: "daily-records", label: "Records" },
	{ path: "vehicles", label: "Vehicles" },
	{ path: "drivers", label: "Drivers" },
];

const CLOCK_FORMAT = "HH:mm, dddd DD MMMM YYYY ";

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
		<Container maxWidth="md">
			<AppBar
				enableColorOnDark
				variant="outlined"
				color="default"
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
						spacing={2}
						divider={
							<Divider
								flexItem
								orientation="vertical"
							/>
						}
					>
						{ROUTES.map((route) => (
							<Link
								to={route.path}
								key={"item" + route.path}
							>
								<Typography>
									{route.label}
								</Typography>
							</Link>
						))}
					</Stack>
					<Typography>{clock}</Typography>
				</Toolbar>
			</AppBar>
			<Box marginY={8}>
				<Paper
					variant="outlined"
					sx={{
						padding: 4,
					}}
				>
					<Outlet />
				</Paper>
			</Box>
		</Container>
	);
};
