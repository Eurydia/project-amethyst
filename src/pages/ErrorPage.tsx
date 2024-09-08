import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	isRouteErrorResponse,
	Link,
	useRouteError,
} from "react-router-dom";

export const ErrorPage: FC = () => {
	const error = useRouteError();

	let statusText = "เกิดข้อผิดพลาด";
	if (isRouteErrorResponse(error)) {
		statusText = error.statusText;
	}
	console.log(error);

	return (
		<Stack
			spacing={1}
			padding={2}
		>
			<Typography
				component={Link}
				to="/"
				sx={{
					alignItems: "center",
					display: "flex",
				}}
			>
				<KeyboardArrowLeftRounded />
				กลับหน้าแรก
			</Typography>
			<Typography variant="h1">
				{statusText}
			</Typography>
		</Stack>
	);
};
