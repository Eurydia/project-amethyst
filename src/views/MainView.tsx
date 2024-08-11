import { Box, Container } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const MainView: FC = () => {
	return (
		<Container maxWidth="md">
			<Box padding={2}>
				<Outlet />
			</Box>
		</Container>
	);
};
