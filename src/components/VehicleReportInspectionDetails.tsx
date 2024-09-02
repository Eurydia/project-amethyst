import { VehicleReportInspection } from "$types/models/Vehicle";
import { BaseDetails } from "./BaseDetails";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import dayjs from "dayjs";
import { FC } from "react";
import { Typography } from "@mui/material";

type VehicleReportInspectionDetailsProps = {
	report: VehicleReportInspection;
};
export const VehicleReportInspectionDetails: FC<
	VehicleReportInspectionDetailsProps
> = (props) => {
	const { report } = props;
	const submit = useSubmit();

	const detailItems = [
		{
			label: "ลงบันทึกเมื่อ",
			value: dayjs(report.datetime)
				.locale("th")
				.format("HH:mm น. DD MMMM YYYY"),
		},
		{
			label: "เลขทะเบียนรถ",
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
			label: "กล้องหน้ารถ",
			value: report.frontCamera,
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
			value: report.overheadFan,
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
			value: report.brakeLights,
		},
		{
			label: "ไฟเลี้ยว",
			value: report.turnSignals,
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
			value: report.rearviewMirror,
		},
		{
			label: "กระจกมองข้าง",
			value: report.sideviewMirror,
		},
		{
			label: "รายละเอียดเพิ่มเติม",
			value: report.content,
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: report.topics.join(", "),
		},
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
	}));

	return (
		<BaseDetails
			slotProps={{
				editButton: {
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{detailItems}
		</BaseDetails>
	);
};
