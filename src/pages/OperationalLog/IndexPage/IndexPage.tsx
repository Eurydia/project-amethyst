import { OperationalLogTable } from "$components/OperationalLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { logEntries, disableAddButton } =
		useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางบันทึกประวัติการเดินรถ
			</Typography>
			<OperationalLogTable
				entries={logEntries}
				slotProps={{
					addButton: {
						disabled: disableAddButton,
						onClick: () =>
							submit({}, { action: "./new" }),
					},
				}}
			/>
		</Stack>
	);
};
