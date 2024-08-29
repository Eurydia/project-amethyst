import { DriverReportFormData } from "$types/form-data";
import { DriverModel } from "$types/models";
import { SaveRounded } from "@mui/icons-material";
import {
	alpha,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
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
				<TopicMultiSelect
					options={topicOptions}
					value={fieldTopics}
					onChange={setFieldTopics}
				/>
			),
		},
	];
	const renderedFormItems = formItems.map(
		(item, index) => (
			<Grid
				key={"form-item" + index}
				item
				container
				paddingY={1}
				sx={{
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
					item
					xs={12}
					md={3}
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
					md={8}
				>
					{item.value}
				</Grid>
			</Grid>
		),
	);

	return (
		<Grid container>
			{renderedFormItems}
			<Grid
				item
				xs={12}
				paddingY={1}
			>
				<Stack
					display="flex"
					flexDirection="row"
					flexWrap="wrap"
					spacing={1}
					useFlexGap
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
				</Stack>
			</Grid>
		</Grid>
	);
};
