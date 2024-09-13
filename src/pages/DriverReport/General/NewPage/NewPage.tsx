import { postDriverReportGeneral } from "$backend/database/post";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		selectedDriver,
		driverSelectOptions,
		topicOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

	const submit = useSubmit();
	const hasSelectedDriver =
		selectedDriver !== null;

	const action = hasSelectedDriver
		? "/drivers/info/" + selectedDriver.id
		: "/drivers/report/general";
	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action,
			},
		);
	};

	const handleSubmit = async (
		formData: DriverReportFormData,
	) => {
		postDriverReportGeneral(formData)
			.then((reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/drivers/report/general/info/" +
							reportId,
					},
				);
			})
			.catch(() => {
				toast.error("ลงบันทึกล้มเหลว");
				handleCancel();
			});
	};
	const heading = hasSelectedDriver ? (
		<Fragment>
			<Typography variant="h1">
				{`${selectedDriver.name} ${selectedDriver.surname}`}
			</Typography>
			<Typography variant="h2">
				แบบฟอร์มบันทึกเรื่องร้องเรียน
			</Typography>
		</Fragment>
	) : (
		<Typography variant="h1">
			แบบฟอร์มบันทึกเรื่องร้องเรียน
		</Typography>
	);

	return (
		<Stack spacing={1}>
			{heading}
			<DriverReportForm
				initFormData={initFormData}
				slotProps={{
					driverSelect: {
						disabled: hasSelectedDriver,
						options: driverSelectOptions,
					},
					topicComboBox: {
						options: topicOptions,
					},
					submitButton: {
						label: "เพิ่มเรื่องร้องเรียน",
						startIcon: <AddRounded />,
						onClick: handleSubmit,
					},
					cancelButton: {
						label: "ยกเลิก",
						onClick: handleCancel,
					},
				}}
			/>
		</Stack>
	);
};
