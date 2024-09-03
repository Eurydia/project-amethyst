import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TypographyButton } from "./TypographyButton";
import { PickupRouteReport } from "$types/models/PickupRoute";

type PickupRouteReportDetailsProps = {
	report: PickupRouteReport;
	onEdit: () => void;
};
export const PickupRouteReportDetails: FC<
	PickupRouteReportDetailsProps
> = (props) => {
	const { onEdit, report } = props;

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "บันทึกเมื่อ",
			value: (
				<Typography>
					{dayjs(report.datetime)
						.locale("th")
						.format(
							"HH:mm น. วันdddที่ DD MMMM YYYY",
						)}
				</Typography>
			),
		},
		{
			label: "สายรถ",
			value: (
				<Typography
					component={Link}
					to={
						"/pickup-routes/info/" +
						report.routeId
					}
				>
					{report.routeName}
				</Typography>
			),
		},
		{
			label: "เรื่อง",
			value: (
				<Typography>{report.title}</Typography>
			),
		},
		{
			label: "รายละเอียด",
			value: (
				<Typography>{report.content}</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<Typography>
					{report.topics.join(", ")}
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
