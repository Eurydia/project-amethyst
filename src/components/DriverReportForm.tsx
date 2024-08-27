import { SaveRounded } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { DriverSelect } from "./DriverSelect";
import { TopicMultiSelect } from "./TopicMultiSelect";
import { DriverReportFormData } from "$types/form-data";
import { DriverModel } from "$types/models";
import { TypographyButton } from "./TypographyButton";

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
		<Grid
			container
			spacing={1}
		>
			<Grid
				item
				xs={12}
				md={6}
			>
				<DateField
					fullWidth
					value={fieldDate}
					onChange={handleDateChange}
					format="DD/MM/YYYY"
				/>
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
			>
				<TimeField
					fullWidth
					value={fieldTime}
					onChange={handleTimeChange}
					format="HH:mm น."
				/>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<DriverSelect
					showError={isDriverEmpty}
					disabled={shouldLockDriver}
					options={driverOptions}
					value={fieldDriver}
					onChange={setFieldDriver}
				/>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<TextField
					autoFocus
					required
					fullWidth
					error={isTitleEmpty}
					value={fieldTitle}
					onChange={handleTitleChange}
					placeholder="เรื่อง"
				/>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<TextField
					multiline
					fullWidth
					value={fieldContent}
					onChange={handleContentChange}
					minRows={5}
					placeholder="รายละเอียด"
				/>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<TopicMultiSelect
					options={topicOptions}
					value={fieldTopics}
					onChange={handleFieldTopicsChange}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				display="flex"
				flexDirection="row"
				flexWrap="wrap"
				gap={1}
			>
				<TypographyButton
					disabled={isFormIncomplete}
					startIcon={<SaveRounded />}
					variant="contained"
					onClick={handleSubmit}
				>
					บันทึก
				</TypographyButton>
				<TypographyButton
					variant="outlined"
					onClick={handleCancel}
				>
					ยกเลิก
				</TypographyButton>
			</Grid>
		</Grid>
	);
};
