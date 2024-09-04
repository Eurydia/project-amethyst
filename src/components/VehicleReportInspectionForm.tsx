import {
	VehicleModel,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";
import {
	TextField,
	TextFieldProps,
} from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { VehicleInputSelect } from "./VehicleInputSelect";

const CustomTextField: FC<TextFieldProps> = (
	props,
) => {
	const { placeholder, ...rest } = props;
	return (
		<TextField
			{...rest}
			multiline
			fullWidth
			minRows={2}
			placeholder={placeholder || "ปกติ"}
		/>
	);
};

type VehicleReportInspectionFormProps = {
	vehicleOptions: VehicleModel[];
	topicOptions: string[];
	initFormData: VehicleReportInspectionFormData;
	onSubmit: (
		formData: VehicleReportInspectionFormData,
	) => void;
	onCancel: () => void;
	slotProps: {
		submitButton: {
			label: string;
			startIcon: ReactNode;
		};
	};
};
export const VehicleReportInspectionForm: FC<
	VehicleReportInspectionFormProps
> = (props) => {
	const {
		vehicleOptions,
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
	const [fieldContent, setFieldContent] =
		useState(initFormData.content);
	const [fieldBodyFrame, setFieldBodyFrame] =
		useState(initFormData.frame);
	const [fieldWindows, setFieldWindows] =
		useState(initFormData.windows);
	const [fieldFrontCam, setFieldFrontCam] =
		useState(initFormData.frontCamera);
	const [fieldFanOverhead, setFieldFanOverhead] =
		useState(initFormData.overheadFan);
	const [fieldBrakeLight, setFieldBrakeLight] =
		useState(initFormData.brakeLights);
	const [fieldHeadlights, setFieldHeadlights] =
		useState(initFormData.headlights);
	const [fieldTurnSignals, setFieldTurnSignals] =
		useState(initFormData.turnSignals);
	const [
		fieldMirrorRearview,
		setFieldMirrorRearview,
	] = useState(initFormData.rearviewMirror);
	const [
		fieldMirrorSideview,
		setFieldMirrorSideview,
	] = useState(initFormData.sideviewMirror);
	const [fieldSeatbelts, setFieldSeatbelts] =
		useState(initFormData.seatbelts);
	const [fieldSeats, setFieldSeats] = useState(
		initFormData.seats,
	);
	const [fieldTires, setFieldTires] = useState(
		initFormData.tires,
	);
	const [fieldTopics, setFieldTopics] = useState(
		initFormData.topics,
	);
	const [fieldVehicle, setFieldVehicle] =
		useState(initFormData.vehicle);

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

		const formData: VehicleReportInspectionFormData =
			{
				datetime: datetime,
				vehicle: fieldVehicle,
				content: fieldContent.normalize().trim(),
				topics: fieldTopics
					.map((topic) =>
						topic.normalize().trim(),
					)
					.filter((topic) => topic.length > 0),
				frame:
					fieldBodyFrame.normalize().trim() ||
					"ปกติ",
				windows:
					fieldWindows.normalize().trim() ||
					"ปกติ",
				frontCamera:
					fieldFrontCam.normalize().trim() ||
					"ปกติ",
				overheadFan:
					fieldFanOverhead.normalize().trim() ||
					"ปกติ",
				brakeLights:
					fieldBrakeLight.normalize().trim() ||
					"ปกติ",
				headlights:
					fieldHeadlights.normalize().trim() ||
					"ปกติ",
				turnSignals:
					fieldTurnSignals.normalize().trim() ||
					"ปกติ",
				rearviewMirror:
					fieldMirrorRearview
						.normalize()
						.trim() || "ปกติ",
				sideviewMirror:
					fieldMirrorSideview
						.normalize()
						.trim() || "ปกติ",
				seatbelts:
					fieldSeatbelts.normalize().trim() ||
					"ปกติ",
				seats:
					fieldSeats.normalize().trim() || "ปกติ",
				tires:
					fieldTires.normalize().trim() || "ปกติ",
			};

		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const shouldLockVehicleField =
		initFormData.vehicle !== null;

	const isVehicleEmpty = fieldVehicle === null;
	const isFormIncomplete = isVehicleEmpty;

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
			label: "เลขทะเบียน",
			value: (
				<VehicleInputSelect
					isDisabled={shouldLockVehicleField}
					options={vehicleOptions}
					value={fieldVehicle}
					onChange={setFieldVehicle}
				/>
			),
		},
		{
			label: "กล้องหน้ารถ",
			value: (
				<CustomTextField
					value={fieldFrontCam}
					onChange={(e) =>
						setFieldFrontCam(e.target.value)
					}
				/>
			),
		},
		{
			label: "เข็มขัดนิรภัย",
			value: (
				<CustomTextField
					value={fieldSeatbelts}
					onChange={(e) =>
						setFieldSeatbelts(e.target.value)
					}
				/>
			),
		},
		{
			label: "ที่นั่งและเบาะ",
			value: (
				<CustomTextField
					value={fieldSeats}
					onChange={(e) =>
						setFieldSeats(e.target.value)
					}
				/>
			),
		},
		{
			label: "พัดลม",
			value: (
				<CustomTextField
					value={fieldFanOverhead}
					onChange={(e) =>
						setFieldFanOverhead(e.target.value)
					}
				/>
			),
		},
		{
			label: "หน้าต่าง",
			value: (
				<CustomTextField
					value={fieldWindows}
					onChange={(e) =>
						setFieldWindows(e.target.value)
					}
				/>
			),
		},
		{
			label: "ไฟหน้า",
			value: (
				<CustomTextField
					value={fieldHeadlights}
					onChange={(e) =>
						setFieldHeadlights(e.target.value)
					}
				/>
			),
		},
		{
			label: "ไฟเบรค",
			value: (
				<CustomTextField
					value={fieldBrakeLight}
					onChange={(e) =>
						setFieldBrakeLight(e.target.value)
					}
				/>
			),
		},
		{
			label: "ไฟเลี้ยว",
			value: (
				<CustomTextField
					value={fieldTurnSignals}
					onChange={(e) =>
						setFieldTurnSignals(e.target.value)
					}
				/>
			),
		},
		{
			label: "ตัวรถ",
			value: (
				<CustomTextField
					value={fieldBodyFrame}
					onChange={(e) =>
						setFieldBodyFrame(e.target.value)
					}
				/>
			),
		},
		{
			label: "กระจกมองหลัง",
			value: (
				<CustomTextField
					value={fieldMirrorRearview}
					onChange={(e) =>
						setFieldMirrorRearview(e.target.value)
					}
				/>
			),
		},
		{
			label: "กระจกมองข้าง",
			value: (
				<CustomTextField
					value={fieldMirrorSideview}
					onChange={(e) =>
						setFieldMirrorSideview(e.target.value)
					}
				/>
			),
		},
		{
			label: "ยางและล้อ",
			value: (
				<CustomTextField
					value={fieldTires}
					onChange={(e) =>
						setFieldTires(e.target.value)
					}
				/>
			),
		},
		{
			label: "รายละเอียดเพิ่มเติม",
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

					label:
						props.slotProps.submitButton.label,
					startIcon:
						props.slotProps.submitButton
							.startIcon,
				},
				cancelButton: {
					onClick: handleCancel,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
