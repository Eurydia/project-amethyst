import { OperationalLogTable } from "$components/OperationalLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";

export const IndexPage: FC = () => {
	const submit = useSubmit();
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางบันทึกประวัติการเดินรถ
			</Typography>
			<OperationalLogTable
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
