import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type PickupRouteReportInfoGroupProps = {
	route: PickupRouteModel;
	report: PickupRouteReportModel;
};
export const PickupRouteReportInfoGroup: FC<
	PickupRouteReportInfoGroupProps
> = (props) => {
	const { report, route } = props;
	const submit = useSubmit();

	const infoItems = [
		{
			label: "เลขที่เรื่องร้องเรียน",
			value: report.id,
		},
		{
			label: "บันทึกเมื่อ",
			value: dayjs(report.datetime)
				.locale("th")
				.format(
					"HH:mm น. วันddddที่ DD MMMM YYYY",
				),
		},
		{
			label: "สายรถ",
			value: (
				<Link
					to={"/pickup-routes/info/" + route.id}
				>
					{route.name}
				</Link>
			),
		},
		{
			label: "เรื่อง",
			value: report.title,
		},
		{
			label: "รายละเอียด",
			value: report.content,
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: report.topics.replaceAll(",", ", "),
		},
	].map(({ label, value }) => ({
		label,
		value: (
			<Typography
				sx={{
					wordBreak: "break-word",
				}}
			>
				{value}
			</Typography>
		),
	}));

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					label: "แก้ไข",
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
