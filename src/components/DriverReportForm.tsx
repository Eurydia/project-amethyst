import { DriverReportFormData } from "$types/form-data";
import { DriverModel } from "$types/models";
import { SaveRounded } from "@mui/icons-material";
import {
	alpha,
	Box,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, ReactNode, useState } from "react";
import { DriverSelect } from "./DriverSelect";
import { TopicMultiSelect } from "./TopicMultiSelect";
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
					onChange={handleTimeChange}
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
					onChange={handleDateChange}
					format="DD/MM/YYYY"
				/>
			),
		},
		{
			label: "ผู้ที่ถูกร้องเรียน",
			value: (
				<DriverSelect
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
					value={fieldTitle}
					onChange={handleTitleChange}
					placeholder="เรื่อง"
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
					onChange={handleContentChange}
					placeholder="รายละเอียด"
				/>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<TopicMultiSelect
					options={topicOptions}
					value={fieldTopics}
					onChange={handleFieldTopicsChange}
				/>
			),
		},
	];
	const renderedFormItems = formItems.map(
		(item, index) => (
			<Paper
				key={"form-item" + index}
				elevation={0}
				square
				sx={{
					widows: "100%",
					backgroundColor: ({ palette }) =>
						alpha(
							index % 2 === 1
								? palette.primary.light
								: palette.common.white,
							0.05,
						),
				}}
			>
				<Grid
					container
					spacing={1}
				>
					<Grid
						item
						xs={12}
						md={2}
						display="flex"
						alignItems="center"
					>
						<Typography fontWeight="bold">
							{item.label}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
					>
						{item.value}
					</Grid>
				</Grid>
			</Paper>
		),
	);

	return (
		<Box>
			<Grid
				container
				spacing={1}
			>
				<Grid
					item
					xs={12}
					display="flex"
					gap={1}
					flexDirection="column"
				>
					{renderedFormItems}
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
		</Box>
	);
};
