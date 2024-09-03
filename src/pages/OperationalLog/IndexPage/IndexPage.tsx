import { OperationalLogTable } from "$components/OperationalLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางบันทึกประวัติการเดินรถ
			</Typography>
			<OperationalLogTable
				entries={entries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit({}, { action: "./new" }),
					},
				}}
			/>
		</Stack>
	);
};
