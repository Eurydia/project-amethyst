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
import {
	FC,
	Fragment,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	Link,
	Outlet,
	useLocation,
} from "react-router-dom";
import { StyledBreadcrumbs } from "../components/StyledBreadcrumbs";
import dayjs from "dayjs";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { AddressBar } from "../components/AddressBar";

const ROUTES = [
	"สายรถ",
	"บันทึกประจำวัน",
	"ทะเบียนรถ",
	"คนขับ",
];

export const MainView: FC = () => {
	const { pathname } = useLocation();

	const [clock, setClock] = useState(
		dayjs()
			.locale("th")
			.format(
				"วันddddที่ DD MMMM YYYY เวลา HH:mm น.",
			),
	);

	useEffect(() => {
		const id = setInterval(() => {
			setClock(
				dayjs()
					.locale("th")
					.format(
						"วันddddที่ DD MMMM YYYY เวลา HH:mm น.",
					),
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
				<Toolbar variant="dense">
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
						<Link to="/">
							<Typography>หน้าแรก</Typography>
						</Link>
						{ROUTES.map((route, index) => (
							<Link
								to={route}
								key={"item" + index}
							>
								<Typography>{route}</Typography>
							</Link>
						))}
					</Stack>
				</Toolbar>
			</AppBar>
			<Box marginY={8}>
				<Toolbar
					variant="dense"
					disableGutters
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-end",
					}}
				>
					<AddressBar />
					<Typography>{clock}</Typography>
				</Toolbar>
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
