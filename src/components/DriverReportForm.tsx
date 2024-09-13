import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/driver";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { DriverInputDriverSelect } from "./DriverInputDriverSelect";

type DriverReportFormProps = {
	initFormData: DriverReportFormData;

	slotProps: {
		submitButton: {
			startIcon: ReactNode;
			label: string;
			onClick: (
				formData: DriverReportFormData,
			) => void;
		};
		cancelButton: {
			onClick: () => void;
			label: string;
		};
		driverSelect: {
			options: DriverModel[];
			disabled?: boolean;
		};
		topicComboBox: {
			options: string[];
		};
	};
};
export const DriverReportForm: FC<
	DriverReportFormProps
> = (props) => {
	const { initFormData, slotProps } = props;

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

		slotProps.submitButton.onClick({
			driver: fieldDriver,
			content: fieldContent.normalize().trim(),
			title: fieldTitle.normalize().trim(),
			topics: fieldTopics
				.map((topic) => topic.trim().normalize())
				.filter((topic) => topic.length > 0),

			datetime,
		});
	};

	const isMissingTime =
		Number.isNaN(fieldTime.hour()) ||
		Number.isNaN(fieldTime.minute());
	const isMissingDate =
		Number.isNaN(fieldDate.day()) ||
		Number.isNaN(fieldDate.month()) ||
		Number.isNaN(fieldDate.year());
	const isMissingTitle = fieldTitle.trim() === "";
	const isMissingContent =
		fieldContent.trim() === "";
	const isFormIncomplete =
		isMissingTitle ||
		isMissingDate ||
		isMissingTime;

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
				<DriverInputDriverSelect
					disabled={
						slotProps.driverSelect.disabled
					}
					options={slotProps.driverSelect.options}
					value={fieldDriver}
					onChange={setFieldDriver}
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
					isError={isMissingTitle}
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
					isError={isMissingContent}
					placeholder={initFormData.content}
					onChange={setFieldContent}
				/>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<BaseInputTopicComboBox
					options={
						slotProps.topicComboBox.options
					}
					values={fieldTopics}
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
					onClick: slotProps.cancelButton.onClick,
					label: slotProps.cancelButton.label,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
