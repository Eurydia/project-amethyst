import { OperationalLogTable } from "$components/OperationalLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const {
		driverMultiSelectOptions,
		vehicleMultiSelectOptions,
		routeMultiSelectOptions,
		logEntries,
	} = useLoaderData() as IndexPageLoaderData;
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
						onClick: () =>
							submit({}, { action: "./new" }),
					},
					driverMultiSelect: {
						options: driverMultiSelectOptions,
					},
					vehicleMultiSelect: {
						options: vehicleMultiSelectOptions,
					},
					routeMultiSelect: {
						options: routeMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
