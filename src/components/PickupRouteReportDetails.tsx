import { PickupRouteReport } from "$types/models/PickupRoute";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type PickupRouteReportDetailsProps = {
	report: PickupRouteReport;
};
export const PickupRouteReportDetails: FC<
	PickupRouteReportDetailsProps
> = (props) => {
	const { report } = props;
	const submit = useSubmit();
	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "บันทึกเมื่อ",
			value: dayjs(report.datetime)
				.locale("th")
				.format(
					"HH:mm น. วันdddที่ DD MMMM YYYY",
				),
		},
		{
			label: "สายรถ",
			value: (
				<Link
					to={
						"/pickup-routes/info/" +
						report.routeId
					}
				>
					{report.routeName}
				</Link>
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
			value: report.content,
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: report.topics.join(", "),
		},
	].map(({ label, value }) => ({
		label,
		value: <Typography> {value}</Typography>,
	}));

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					onClick: () =>
						submit(
							{},
							{
								action: "./edit",
							},
						),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
