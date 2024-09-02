import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/Driver";
import { SaveRounded } from "@mui/icons-material";
import { TextField } from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { DriverSelect } from "./DriverSelect";
import { TopicComboBox } from "./TopicComboBox";

type DriverReportFormProps = {
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
	onSubmit: (
		formData: DriverReportFormData,
	) => void;
	onCancel: () => void;
};
export const DriverReportForm: FC<
	DriverReportFormProps
> = (props) => {
	const {
		driverOptions,
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

		const formData: DriverReportFormData = {
			content: fieldContent.normalize().trim(),
			datetime: datetime,
			driver: fieldDriver,
			title: fieldTitle.normalize().trim(),
			topics: fieldTopics
				.map((topic) => topic.normalize())
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),
		};

		onSubmit(formData);
	};

	const shouldLockDriver =
		initFormData.driver !== null;
	const isDriverEmpty = fieldDriver === null;
	const isTitleEmpty = fieldTitle.trim() === "";
	const isFormIncomplete =
		isDriverEmpty || isTitleEmpty;

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
			label: "คนขับ",
			value: (
				<DriverSelect
					showError={isDriverEmpty}
					options={driverOptions}
					value={fieldDriver}
					onChange={setFieldDriver}
					disabled={shouldLockDriver}
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
				<TopicComboBox
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
					onClick: onCancel,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
