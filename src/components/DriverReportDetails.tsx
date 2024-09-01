import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TypographyButton } from "./TypographyButton";
import { DriverReport } from "$types/models/Driver";

type DriverReportDetailsProps = {
	entry: DriverReport;
	onEdit: () => void;
};
export const DriverReportDetails: FC<
	DriverReportDetailsProps
> = (props) => {
	const { onEdit, entry } = props;

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "บันทึกเมื่อ",
			value: (
				<Typography>
					{dayjs(entry.datetime)
						.locale("th")
						.format(
							"HH:mm น. วันdddที่ DD MMMM YYYY",
						)}
				</Typography>
			),
		},
		{
			label: "ผลตรวจของ",
			value: (
				<Typography>
					<Link
						to={
							"/drivers/info/" + entry.driver_id
						}
					>
						{entry.driver_name}{" "}
						{entry.driver_surname}
					</Link>
				</Typography>
			),
		},
		{
			label: "เรื่อง",
			value: (
				<Typography>{entry.title}</Typography>
			),
		},
		{
			label: "รายละเอียด",
			value: (
				<Typography>{entry.content}</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<Typography>
					{entry.topics.join(", ")}
				</Typography>
			),
		},
	];

	return (
		<Stack
			sx={{
				gap: 1,
			}}
		>
			<TypographyButton
				startIcon={<EditRounded />}
				variant="contained"
				onClick={onEdit}
			>
				แก้ไขข้อมูล
			</TypographyButton>
			<FormalLayout>{infoItems}</FormalLayout>
		</Stack>
	);
};
