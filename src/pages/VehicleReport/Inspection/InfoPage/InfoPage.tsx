import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC, ReactNode } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoPageLoaderData } from "./loader";
import { BaseDetails } from "$components/BaseReportDetails";
import { renderReportToInfoItems } from "$core/renderReports";
import dayjs from "dayjs";

export const InfoPage: FC = () => {
	const { entry } =
		useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ลงบันทึกเมื่อ",
			value: (
				<Typography>
					{dayjs(entry.datetime)
						.locale("th")
						.format("HH:mm น. DD MMMM YYYY")}
				</Typography>
			),
		},
	];
	const heading = `ผลการตรวจสารเสพติด เลขที่ ${entry.id}`;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<BaseDetails
				onEdit={() =>
					submit({}, { action: "./edit" })
				}
			>
				{infoItems}
			</BaseDetails>
		</Stack>
	);
};
