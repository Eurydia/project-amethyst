import { SaveRounded } from "@mui/icons-material";
import {
	Stack,
	TextField,
	Button,
} from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { DriverSelect } from "./DriverSelect";
import { TopicMultiSelect } from "./MultiSelectAutocomplete";
import { DriverReportFormData } from "$types/form-data";
import { DriverModel } from "$types/models";

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

	const handleDateChange = (
		value: Dayjs | null,
		_: unknown,
	) => {
		if (value === null) {
			return;
		}
		setFieldDate(value);
	};

	const handleTimeChange = (
		value: Dayjs | null,
		_: unknown,
	) => {
		if (value === null) {
			return;
		}
		setFieldTime(value);
	};

	const handleTitleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setFieldTitle(e.target.value);
	};

	const handleContentChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setFieldContent(e.target.value);
	};

	const handleFieldTopicsChange = (
		values: string[],
	) => {
		setFieldTopics(values);
	};

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
			content: fieldContent,
			datetime: datetime,
			driver: fieldDriver,
			title: fieldTitle,
			topics: fieldTopics,
		};

		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const shouldLockDriver =
		initFormData.driver !== null;
	const isDriverEmpty = fieldDriver === null;
	const isTitleEmpty = fieldTitle.trim() === "";

	const isFormIncomplete =
		isDriverEmpty || isTitleEmpty;

	return (
		<Stack spacing={2}>
			<Stack
				direction="row"
				spacing={2}
			>
				<DateField
					label="วัน/เดือน/ปี"
					fullWidth
					value={fieldDate}
					onChange={handleDateChange}
					format="DD/MM/YYYY"
				/>
				<TimeField
					fullWidth
					label="เวลา"
					value={fieldTime}
					onChange={handleTimeChange}
					format="HH:mm น."
				/>
			</Stack>
			<DriverSelect
				showError={isDriverEmpty}
				disabled={shouldLockDriver}
				options={driverOptions}
				value={fieldDriver}
				onChange={setFieldDriver}
			/>
			<TextField
				autoFocus
				required
				fullWidth
				error={isTitleEmpty}
				value={fieldTitle}
				onChange={handleTitleChange}
				placeholder="เรื่อง"
			/>
			<TextField
				multiline
				fullWidth
				value={fieldContent}
				onChange={handleContentChange}
				minRows={5}
				placeholder="รายละเอียด"
			/>
			<TopicMultiSelect
				options={topicOptions}
				value={fieldTopics}
				onChange={handleFieldTopicsChange}
			/>
			<Stack
				spacing={2}
				direction="row"
			>
				<Button
					disabled={isFormIncomplete}
					disableElevation
					startIcon={<SaveRounded />}
					variant="contained"
					onClick={handleSubmit}
				>
					บันทึก
				</Button>
				<Button
					disableElevation
					variant="outlined"
					onClick={handleCancel}
				>
					ยกเลิก
				</Button>
			</Stack>
		</Stack>
	);
};
