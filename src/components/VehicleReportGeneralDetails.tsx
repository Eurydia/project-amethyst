import { VehicleReportGeneral } from "$types/models/Vehicle";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type VehicleReportGeneralDetailsProps = {
	report: VehicleReportGeneral;
};
export const VehicleReportGeneralDetails: FC<
	VehicleReportGeneralDetailsProps
> = (props) => {
	const { report } = props;
	const submit = useSubmit();
	const details = [
		{
			label: "วันที่ลงบันทึก",
			value: dayjs(report.datetime)
				.locale("th")
				.format(
					"HH:mm น. วันddddที่ DD MMMM YYYY",
				),
		},
		{
			label: "ทะเบียนรถ",
			value: (
				<Link
					to={
						"/vehicles/info/" + report.vehicleId
					}
				>
					{report.vehicleLicensePlate}
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
			value:
				report.topics.length > 0
					? report.topics.join(", ")
					: "ไม่มีหัวข้อที่เกี่ยวข้อง",
		},
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
	}));
	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{details}
		</BaseInfoGroup>
	);
};
