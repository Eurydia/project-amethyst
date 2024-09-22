/** @format */

import { tauriPutVehicleReportGeneral } from "$backend/database/put";
import { FormalLayout } from "$layouts/FormalLayout";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralModel } from "$types/models/vehicle-report-general";
import { EditRounded, SaveRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { VehicleReportGeneralForm } from "./VehicleReportGeneralForm";

type VehicleReportGeneralInfoGroupProps = {
	report: VehicleReportGeneralModel;
	vehicle: VehicleModel;
	slotProps: {
		form: {
			topicComboBox: {
				options: string[];
			};
		};
	};
};
export const VehicleReportGeneralInfoGroup: FC<
	VehicleReportGeneralInfoGroupProps
> = (props) => {
	const { report, vehicle, slotProps } = props;
	const { revalidate } = useRevalidator();
	const [dialogOpen, setDialogOpen] = useState(false);

	const infoItems = [
		{
			label: "วันที่ลงบันทึก",
			value: dayjs(report.datetime)
				.locale("th")
				.format("HH:mm น. วันddddที่ DD MMMM YYYY"),
		},
		{
			label: "เลขทะเบียน",
			value: (
				<Link to={"/vehicles/info/" + vehicle.id}>{vehicle.license_plate}</Link>
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
	].map(({ label, value }) => ({
		label,
		value: <Typography>{value}</Typography>,
	}));

	infoItems.push({
		label: "หัวข้อที่เกี่ยวข้อง",
		value:
			report.topics.length > 0 ? (
				<Typography>{report.topics.replaceAll(",", ", ")}</Typography>
			) : (
				<Typography fontStyle="italic">ไม่มีหัวข้อที่เกี่ยวข้อง</Typography>
			),
	});

	return (
		<Stack spacing={1}>
			<Button
				variant="outlined"
				startIcon={<EditRounded />}
				onClick={() => setDialogOpen(true)}
			>
				แก้ไขข้อมูล
			</Button>
			<FormalLayout>{infoItems}</FormalLayout>
			<VehicleReportGeneralForm
				initFormData={{
					datetime: "",
					title: "",
					content: "",
					topics: [],
					vehicle: {
						id: 0,
						license_plate: "",
						vendor: "",
						vehicle_class: "",
						registered_city: "",
					},
				}}
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				title="แก้ไขข้อมูลเรื่องร้องเรียนรถรับส่ง"
				slotProps={{
					submitButton: {
						startIcon: <SaveRounded />,
						label: "บันทึกการเปลี่ยนแปลง",
						onClick: (formData) =>
							tauriPutVehicleReportGeneral(report.id, formData)
								.then(
									() => {
										toast.success("บันทึกสำเร็จ");
										revalidate();
									},
									() => toast.error("บันทึกล้มเหลว")
								)
								.finally(() => setDialogOpen(false)),
					},
					topicComboBox: slotProps.form.topicComboBox,
					vehcleSelect: {
						options: [vehicle],
						disabled: true,
					},
				}}
			/>
		</Stack>
	);
};
