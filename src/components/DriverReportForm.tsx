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
import { MultiSelectAutocomplete } from "./MultiSelectAutocomplete";
import { DriverReportFormData } from "$types/form-data";
import { DriverModel } from "$types/models";

type DriverReportFormProps = {
	selectedDriver: DriverModel | null;
	drivers: DriverModel[];
	topics: string[];
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
		drivers,
		selectedDriver,
		topics,
		initFormData,
		onSubmit,
		onCancel,
	} = props;

	const [fieldDate, setFieldDate] = useState(
		dayjs(initFormData.datetime_iso).locale("th"),
	);
	const [fieldTime, setFieldTime] = useState(
		dayjs(initFormData.datetime_iso).locale("th"),
	);
	const [fieldTitle, setFieldTitle] = useState(
		initFormData.title,
	);
	const [fieldContent, setFieldContent] =
		useState(initFormData.content);
	const [fieldTopics, setFieldTopics] =
		useState<string>(initFormData.topics);
	const [fieldDriver, setFieldDriver] =
		useState<DriverModel | null>(selectedDriver);

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
		setFieldTopics(values.join(","));
	};

	const handleSubmit = async () => {
		if (fieldDriver === null) {
			return;
		}
		if (fieldTitle.trim() === "") {
			return;
		}

		const localeDateTime = fieldDate
			.set("hour", fieldTime.hour())
			.set("minute", fieldTime.minute())
			.set("second", fieldTime.second())
			.set("millisecond", fieldTime.millisecond())
			.format();

		onSubmit({
			content: fieldContent,
			datetime_iso: localeDateTime,
			driver_id: fieldDriver.id,
			title: fieldTitle,
			topics: fieldTopics,
			driver_name: fieldDriver.name,
			driver_surname: fieldDriver.surname,
		});
	};

	const handleCancel = () => onCancel();

	const isFormComplete =
		fieldDriver !== null &&
		fieldTitle.trim() !== "";

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
				showError={fieldDriver === null}
				disabled={selectedDriver !== null}
				options={drivers}
				value={fieldDriver}
				onChange={setFieldDriver}
			/>
			<TextField
				autoFocus
				required
				fullWidth
				error={fieldTitle.trim() === ""}
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
			<MultiSelectAutocomplete
				options={topics}
				value={fieldTopics
					.split(",")
					.filter((t) => t.trim() !== "")}
				onChange={handleFieldTopicsChange}
			/>
			<Stack
				spacing={2}
				direction="row"
			>
				<Button
					disabled={!isFormComplete}
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
