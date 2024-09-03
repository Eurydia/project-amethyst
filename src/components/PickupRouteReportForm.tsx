import {
	PickupRouteModel,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { PickupRouteInputSelect } from "./PickupRouteInputSelect";

type PickupRouteReportFormProps = {
	routeOptions: PickupRouteModel[];
	topicOptions: string[];
	initFormData: PickupRouteReportFormData;
	onSubmit: (
		formData: PickupRouteReportFormData,
	) => void;
	onCancel: () => void;
	slotProps: {
		submitButton: {
			startIcon: ReactNode;
			label: string;
		};
	};
};
export const PickupRouteReportForm: FC<
	PickupRouteReportFormProps
> = (props) => {
	const {
		routeOptions,
		topicOptions,
		initFormData,
		slotProps,
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

	const shouldLockRoute =
		initFormData.route !== null;

	const isTimeInvalid =
		Number.isNaN(fieldTime.hour()) ||
		Number.isNaN(fieldTime.minute());
	const isDateInvalid =
		Number.isNaN(fieldDate.date()) ||
		Number.isNaN(fieldDate.month()) ||
		Number.isNaN(fieldDate.year());
	const isRouteEmpty = fieldRoute === null;
	const isTitleEmpty = fieldTitle.trim() === "";

	const isFormIncomplete =
		isRouteEmpty ||
		isTitleEmpty ||
		isTimeInvalid ||
		isDateInvalid;

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
				<PickupRouteInputSelect
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
				<BaseInputTextField
					shouldAutoFocus
					isError={isTitleEmpty}
					value={fieldTitle}
					onChange={setFieldTitle}
					placeholder={initFormData.title}
				/>
			),
		},
		{
			label: "รายละเอียด",
			value: (
				<BaseInputTextField
					multiline
					minRows={6}
					placeholder={initFormData.content}
					value={fieldContent}
					onChange={setFieldContent}
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
					startIcon:
						slotProps.submitButton.startIcon,
					onClick: handleSubmit,
					label: slotProps.submitButton.label,
				},
				cancelButton: {
					onClick: onCancel,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
