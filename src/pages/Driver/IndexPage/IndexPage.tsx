import { DriverTable } from "$components/DriverTable";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { driverEntries } =
		useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to="/"
			>
				<KeyboardArrowLeftRounded />
				หน้าแรก
			</Typography>
			<Typography variant="h1">
				รายชื่อคนขับรถ
			</Typography>
			<DriverTable
				entries={driverEntries}
				slotProps={{
					searchField: {
						placeholder: "ค้นหาคนขับรถ",
					},
					addButton: {
						label: "เพิ่มคนขับรถ",
						onClick: () =>
							submit(
								{},
								{
									replace: true,
									action: "/drivers/new",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
