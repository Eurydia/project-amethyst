import {
	VehicleModel,
	VehicleReportGeneralModel,
} from "$types/models/Vehicle";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type VehicleReportGeneralInfoGroupProps = {
	report: VehicleReportGeneralModel;
	vehicle: VehicleModel;
};
export const VehicleReportGeneralInfoGroup: FC<
	VehicleReportGeneralInfoGroupProps
> = (props) => {
	const { report, vehicle } = props;
	const submit = useSubmit();
	const infoItems = [
		{
			label: "วันที่ลงบันทึก",
			value: dayjs(report.datetime)
				.locale("th")
				.format(
					"HH:mm น. วันddddที่ DD MMMM YYYY",
				),
		},
		{
			label: "เลขทะเบียน",
			value: (
				<Link to={"/vehicles/info/" + vehicle.id}>
					{vehicle.license_plate}
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
					? report.topics.replaceAll(",", ", ")
					: "ไม่มีหัวข้อที่เกี่ยวข้อง",
		},
	].map(({ label, value }) => ({
		label,
		value: <Typography>{value}</Typography>,
	}));

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					label: "แก้ไขรายละเอียด",
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
