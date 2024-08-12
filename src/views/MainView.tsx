import {
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
	useEffect,
	useRef,
	useState,
} from "react";
import {
	Outlet,
	useLocation,
} from "react-router-dom";
import { StyledBreadcrumbs } from "../components/StyledBreadcrumbs";
import dayjs from "dayjs";

export const MainView: FC = () => {
	const { pathname } = useLocation();

	return (
		<Container maxWidth="md">
			<Box paddingY={4}>
				<Paper
					variant="outlined"
					sx={{
						padding: 4,
					}}
				>
					<Stack spacing={2}>
						<Toolbar
							disableGutters
							variant="dense"
						>
							<Stack spacing={1}>
								<StyledBreadcrumbs
									path={"หน้าแรก/" + pathname}
								/>
								<Typography>
									{dayjs()
										.locale("th")
										.format(
											"วันdddd DD MMMM YYYY HH:mm น.",
										)}
								</Typography>
							</Stack>
						</Toolbar>
						<Divider />
						<Outlet />
					</Stack>
				</Paper>
			</Box>
		</Container>
	);
};
