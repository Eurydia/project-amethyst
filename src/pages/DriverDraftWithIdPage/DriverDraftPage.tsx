import { postDriverReport } from "$backend/database/put";
import { DriverSelect } from "$components/DriverSelect";
import { DriverModel } from "$types/models";
import { SaveRounded } from "@mui/icons-material";
import {
	Button,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverDraftPageLoaderData } from "./loader";
import { MultiSelectAutocomplete } from "$components/MultiSelectAutocomplete";

export const DriverDraftPage: FC = () => {
	const { drivers, topics } =
		useLoaderData() as DriverDraftPageLoaderData;

	const [fieldDate, setFieldDate] = useState(
		dayjs().locale("th"),
	);
	const [fieldTime, setFieldTime] = useState(
		dayjs().locale("th"),
	);
	const [fieldTitle, setFieldTitle] =
		useState("");
	const [fieldContent, setFieldContent] =
		useState("");
	const [fieldTopics, setFieldTopics] = useState<
		string[]
	>([]);

	const submit = useSubmit();

	const [fieldDriver, setFieldDriver] =
		useState<DriverModel | null>(null);

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

	const handleCommit = async () => {
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

		postDriverReport(
			localeDateTime,
			fieldTitle.trim().normalize(),
			fieldContent.trim().normalize(),
			fieldDriver.id,
			fieldDriver.name,
			fieldDriver.surname,
		)
			.then(() => {
				toast.success("บันทึกสำเร็จ");
				submit({}, { action: "/" });
			})
			.catch((error) => {
				console.error(error);
				toast.error("บันทึกล้มเหลว");
			});
	};

	const handleCancel = () =>
		submit({}, { action: "/" });

	const isFormComplete =
		fieldDriver !== null &&
		fieldTitle.trim() !== "";

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				แบบร่าง รายงานปัญหาคนขับรถ
			</Typography>
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
					value={fieldTopics}
					onChange={setFieldTopics}
				/>
			</Stack>
			<Stack
				spacing={2}
				direction="row"
			>
				<Button
					disabled={!isFormComplete}
					disableElevation
					startIcon={<SaveRounded />}
					variant="contained"
					onClick={handleCommit}
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
