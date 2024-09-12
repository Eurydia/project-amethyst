import { extractBacklinkRouteData } from "$core/extract";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
	Outlet,
	useSearchParams,
} from "react-router-dom";

export const PageView: FC = () => {
	const [urlSearchParam] = useSearchParams();
	const { previousPath, previousPathLabel } =
		extractBacklinkRouteData(urlSearchParam);
	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to={previousPath}
			>
				<KeyboardArrowLeftRounded />
				{previousPathLabel}
			</Typography>
			<Outlet />
		</Stack>
	);
};
