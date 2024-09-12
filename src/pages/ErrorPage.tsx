import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	isRouteErrorResponse,
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
		<Stack spacing={1}>
			<Typography variant="h1">
				{statusText}
			</Typography>
		</Stack>
	);
};
