import { putDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { EditPageLoaderData } from "./loader";
import { TRANSLATION } from "$locale/th";

export const EditPage: FC = () => {
	const { initFormData, driverId } =
		useLoaderData() as EditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: DriverFormData,
	) => {
		putDriver({
			contact: formData.contact,
			id: driverId,
			license_type: formData.contact,
			name: formData.name,
			surname: formData.surname,
		})
			.then(
				() =>
					toast.success(TRANSLATION.putSuccess),
				() => toast.error(TRANSLATION.putFail),
			)
			.finally(() =>
				submit(
					{},
					{ action: "/drivers/info/" + driverId },
				),
			);
	};

	const heading = TRANSLATION.editInfoOf(
		`${initFormData.name}	${initFormData.surname}`,
	);

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<DriverForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit(
						{},
						{
							action: "/drivers/info" + driverId,
						},
					)
				}
			/>
		</Stack>
	);
};
