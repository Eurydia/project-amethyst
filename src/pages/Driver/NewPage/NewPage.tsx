import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";
import { TRANSLATION } from "$locale/th";
import { postDriver } from "$backend/database/post";

export const NewPage: FC = () => {
	const { initFormData } =
		useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: DriverFormData,
	) => {
		postDriver(formData).then(
			(driverId) => {
				toast.success(TRANSLATION.postDriver);
				submit(
					{},
					{
						action: "/drivers/info/" + driverId,
					},
				);
			},
			() => {
				toast.error(TRANSLATION.postFail);
				submit(
					{},
					{
						action: "/drivers",
					},
				);
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{TRANSLATION.postDriver}
			</Typography>
			<DriverForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit({}, { action: "/drivers" })
				}
			/>
		</Stack>
	);
};
