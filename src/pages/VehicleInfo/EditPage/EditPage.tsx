import { putVehicle } from "$backend/database/put";
import { VehicleForm } from "$components/VehicleForm";
import { VehicleFormData } from "$types/models/Vehicle";
import { SaveRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { EditPageLoaderData } from "./loader";

export const EditPage: FC = () => {
	const {
		vehicleId,
		initFormData,
		vendorSelectOptions,
	} = useLoaderData() as EditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleFormData,
	) => {
		putVehicle({
			id: vehicleId,
			license_plate: formData.licensePlate,
			registered_city: formData.registeredCity,
			vendor: formData.vendor,
			vehicle_class: formData.vehicleClass,
		})
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{
						replace: true,
						action: "/vehicles/info/" + vehicleId,
					},
				),
			);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขข้อมูลรถรับส่ง
			</Typography>
			<VehicleForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "บันทึก",
						startIcon: <SaveRounded />,
						onClick: handleSubmit,
					},
					vendorSelect: {
						options: vendorSelectOptions,
					},
					cancelButton: {
						onClick: () =>
							submit(
								{},
								{
									action:
										"/vehicles/info/" + vehicleId,
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
