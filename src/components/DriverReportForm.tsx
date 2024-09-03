import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/Driver";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { DriverInputSelect } from "./DriverInputSelect";

type DriverReportFormProps = {
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
	onSubmit: (
		formData: DriverReportFormData,
	) => void;
	onCancel: () => void;
	slotProps: {
		submitButton: {
			startIcon: ReactNode;
			label: string;
		};
	};
};
export const DriverReportForm: FC<
	DriverReportFormProps
> = (props) => {
	const {
		driverOptions,
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
	const [fieldDriver, setFieldDriver] = useState(
		initFormData.driver,
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

		onSubmit({
			content: fieldContent.normalize().trim(),
			driver: fieldDriver,
			title: fieldTitle.normalize().trim(),
			topics: fieldTopics
				.map((topic) => topic.trim().normalize())
				.filter((topic) => topic.length > 0),

			datetime,
		});
	};

	const shouldLockDriver =
		initFormData.driver !== null;

	const isFieldTimeInvalid =
		Number.isNaN(fieldTime.hour()) ||
		Number.isNaN(fieldTime.minute());
	const isFieldDateInvalid =
		Number.isNaN(fieldDate.day()) ||
		Number.isNaN(fieldDate.month()) ||
		Number.isNaN(fieldDate.year());
	const isTitleEmpty = fieldTitle.trim() === "";
	const isDriverEmpty = fieldDriver === null;
	const isFormIncomplete =
		isTitleEmpty ||
		isDriverEmpty ||
		isFieldDateInvalid ||
		isFieldTimeInvalid;

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
			label: "คนขับรถ",
			value: (
				<DriverInputSelect
					options={driverOptions}
					value={fieldDriver}
					onChange={setFieldDriver}
					isDisabled={shouldLockDriver}
				/>
			),
		},
		{
			label: "เรื่อง",
			value: (
				<BaseInputTextField
					shouldAutoFocus
					onChange={setFieldTitle}
					placeholder={initFormData.title}
					value={fieldTitle}
					isError={isTitleEmpty}
				/>
			),
		},
		{
			label: "รายละเอียด",
			value: (
				<BaseInputTextField
					multiline
					minRows={6}
					value={fieldContent}
					placeholder={initFormData.content}
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
					onClick: handleSubmit,
					label: slotProps.submitButton.label,
					startIcon:
						slotProps.submitButton.startIcon,
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
