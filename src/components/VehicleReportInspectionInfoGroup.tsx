import {
	VehicleModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type VehicleReportInspectionInfoGroupProps = {
	report: VehicleReportInspectionModel;
	vehicle: VehicleModel;
	inspectionRoundNumber: number;
};
export const VehicleReportInspectionInfoGroup: FC<
	VehicleReportInspectionInfoGroupProps
> = (props) => {
	const {
		report,
		inspectionRoundNumber,
		vehicle,
	} = props;
	const submit = useSubmit();

	const infoItems = [
		{
			label: "ตรวจสภาพรอบที่",
			value: inspectionRoundNumber,
		},
		{
			label: "ลงบันทึกเมื่อ",
			value: dayjs(report.datetime)
				.locale("th")
				.format("HH:mm น. DD MMMM YYYY"),
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
			label: "กล้องหน้ารถ",
			value: report.front_camera,
		},
		{
			label: "เข็มขัดนิรภัย",
			value: report.seatbelts,
		},
		{
			label: "เบาะและที่นั่ง",
			value: report.seats,
		},
		{
			label: "พัดลม",
			value: report.overhead_fan,
		},
		{
			label: "หน้าต่าง",
			value: report.windows,
		},
		{
			label: "ไฟหน้า",
			value: report.headlights,
		},
		{
			label: "ไฟเบรค",
			value: report.brake_light,
		},
		{
			label: "ไฟเลี้ยว",
			value: report.turn_signals,
		},
		{
			label: "ยาง",
			value: report.tires,
		},
		{
			label: "ตัวรถ",
			value: report.frame,
		},
		{
			label: "กระจกมองหลัง",
			value: report.rearview_mirror,
		},
		{
			label: "กระจกมองข้าง",
			value: report.sideview_mirror,
		},
		{
			label: "รายละเอียดเพิ่มเติม",
			value: report.content || "...",
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value:
				report.topics.length === 0
					? "ไม่มีหัวข้อที่เกี่ยวข้อง"
					: report.topics.replaceAll(",", ", "),
		},
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
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
