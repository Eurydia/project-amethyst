import { Box, Toolbar } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router";
import { StyledBreadcrumbs } from "./StyledBreadcrumbs";

export const AddressBar: FC = () => {
	const { pathname } = useLocation();

	const appPath = "หน้าแรก" + pathname;

	return <StyledBreadcrumbs path={appPath} />;
};
