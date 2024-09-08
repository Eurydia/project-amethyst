import { putPickupRoute } from "$backend/database/put";
import { PickupRouteForm } from "$components/PickupRouteForm";
import { PickupRouteFormData } from "$types/models/PickupRoute";
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
	const { initFormData, routeId } =
		useLoaderData() as EditPageLoaderData;
	const submit = useSubmit();

	const handleReturn = () => {
		submit(
			{},
			{
				replace: true,
				action: "/pickup-routes/info/" + routeId,
			},
		);
	};

	const handleSubmit = async (
		formData: PickupRouteFormData,
	) => {
		putPickupRoute(routeId, formData)
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(handleReturn);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขข้อมูลสายรถ
			</Typography>
			<PickupRouteForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "บันทึก",
						startIcon: <SaveRounded />,
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: handleReturn,
					},
				}}
			/>
		</Stack>
	);
};
