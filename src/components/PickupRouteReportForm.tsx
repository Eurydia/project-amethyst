import {
	PickupRouteModel,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import { SaveRounded } from "@mui/icons-material";
import { TextField } from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { PickupRouteSelect } from "./PickupRouteInputSelect";

type PickupRouteReportFormProps = {
	routeOptions: PickupRouteModel[];
	topicOptions: string[];
	initFormData: PickupRouteReportFormData;
	onSubmit: (
		formData: PickupRouteReportFormData,
	) => void;
	onCancel: () => void;
};
export const PickupRouteReportForm: FC<
	PickupRouteReportFormProps
> = (props) => {
	const {
		routeOptions,
		topicOptions,
		initFormData,
		onSubmit,
		onCancel,
	} = props;

	const [fieldDate, setFieldDate] = useState(
		dayjs(initFormData.datetime),
	);
	const [fieldTime, setFieldTime] = useState(
		dayjs(initFormData.datetime),
	);
	const [fieldTitle, setFieldTitle] = useState(
		initFormData.title,
	);
	const [fieldContent, setFieldContent] =
		useState(initFormData.content);
	const [fieldTopics, setFieldTopics] = useState(
		initFormData.topics,
	);
	const [fieldRoute, setFieldRoute] = useState(
		initFormData.route,
	);

	const handleSubmit = async () => {
		if (isFormIncomplete) {
			return;
		}

		const datetime = fieldDate
			.set("hour", fieldTime.hour())
			.set("minute", fieldTime.minute())
			.set("second", fieldTime.second())
			.set("millisecond", fieldTime.millisecond())
			.format();

		const formData: PickupRouteReportFormData = {
			content: fieldContent,
			datetime: datetime,
			title: fieldTitle,
			topics: fieldTopics,
			route: fieldRoute,
		};

		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const shouldLockRoute =
		initFormData.route !== null;
	const isRouteEmpty = fieldRoute === null;
	const isTitleEmpty = fieldTitle.trim() === "";

	const isFormIncomplete =
		isRouteEmpty || isTitleEmpty;

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "เวลา",
			value: (
				<TimeField
					fullWidth
					formatDensity="spacious"
					value={fieldTime}
					onChange={(value) => {
						if (value === null) {
							return;
						}
						setFieldTime(value);
					}}
					format="HH:mm น."
				/>
			),
		},
		{
			label: "วัน/เดือน/ปี",
			value: (
				<DateField
					fullWidth
					formatDensity="spacious"
					value={fieldDate}
					onChange={(value) => {
						if (value === null) {
							return;
						}
						setFieldDate(value);
					}}
					format="DD/MM/YYYY"
				/>
			),
		},
		{
			label: "สายรถ",
			value: (
				<PickupRouteSelect
					showError={isRouteEmpty}
					disabled={shouldLockRoute}
					options={routeOptions}
					value={fieldRoute}
					onChange={setFieldRoute}
				/>
			),
		},
		{
			label: "เรื่อง",
			value: (
				<TextField
					fullWidth
					autoFocus
					error={isTitleEmpty}
					value={fieldTitle}
					onChange={(e) =>
						setFieldTitle(e.target.value)
					}
					placeholder={initFormData.title}
				/>
			),
		},
		{
			label: "รายละเอียด",
			value: (
				<TextField
					fullWidth
					multiline
					minRows={6}
					value={fieldContent}
					onChange={(e) =>
						setFieldContent(e.target.value)
					}
					placeholder={initFormData.content}
				/>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<BaseInputTopicComboBox
					options={topicOptions}
					value={fieldTopics}
					onChange={setFieldTopics}
				/>
			),
		},
	];

	return (
		<BaseForm
			slotProps={{
				submitButton: {
					disabled: isFormIncomplete,
					startIcon: <SaveRounded />,
					variant: "contained",
					onClick: handleSubmit,
				},
				cancelButton: {
					onClick: handleCancel,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
