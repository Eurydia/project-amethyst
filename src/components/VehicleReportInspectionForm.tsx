import { tauriPostVehicleReportInspection } from "$backend/database/post";
import { tauriPutVehicleReportInspection } from "$backend/database/put";
import { VEHICLE_REPORT_INSPECTION_TRANSFORMER } from "$core/transformers/vehicle-report-inspection";
import { VehicleModel } from "$types/models/vehicle";
import {
  VehicleReportInspectionFormData,
  VehicleReportInspectionModel,
} from "$types/models/vehicle-report-inspection";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, Fragment, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputDateField } from "./BaseInputDateField";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { VehicleInputVehicle } from "./VehicleInputVehicle";

type VehicleReportInspectionPostFormProps = {
  editing: false;
  open: boolean;
  onClose: () => void;
  slotProps: {
    form: {
      vehicleSelect: {
        disabled?: boolean;
        options: VehicleModel[];
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};

type VehicleReportInspectionPutFormProps = {
  report: VehicleReportInspectionModel;

  editing: true;
  open: boolean;
  onClose: () => void;
  slotProps: {
    form: {
      vehicleSelect: {
        disabled?: boolean;
        options: VehicleModel[];
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};

type VehicleReportInspectionFormProps =
  | VehicleReportInspectionPostFormProps
  | VehicleReportInspectionPutFormProps;
export const VehicleReportInspectionForm: FC<
  VehicleReportInspectionFormProps
> = (props) => {
  const { slotProps, onClose, open, editing } = props;

  const initFormData =
    VEHICLE_REPORT_INSPECTION_TRANSFORMER.toFormData(
      editing ? props.report : undefined,
      slotProps.form.vehicleSelect.options[0]
    );
  const title = editing ? (
    <Fragment>
      <Typography variant="h2">
        {initFormData.vehicle.license_plate}
      </Typography>
      <Typography variant="h3">
        แก้ไขข้อมูลผลการตรวจสภาพรถรับส่ง
      </Typography>
    </Fragment>
  ) : (
    <Typography variant="h2">
      เพิ่มผลการตรวจสภาพรถรับส่ง
    </Typography>
  );
  const [fieldTitle, setFieldTitle] = useState(
    initFormData.title
  );
  const [fieldDate, setFieldDate] = useState(
    dayjs(initFormData.datetime)
  );
  const [fieldTime, setFieldTime] = useState(
    dayjs(initFormData.datetime)
  );
  const [fieldContent, setFieldContent] = useState(
    initFormData.content
  );
  const [fieldFrame, setFieldFrame] = useState(
    initFormData.frame
  );
  const [fieldWindows, setFieldWindows] = useState(
    initFormData.windows
  );
  const [fieldFrontCam, setFieldFrontCam] = useState(
    initFormData.front_camera
  );
  const [fieldFanOverhead, setFieldFanOverhead] = useState(
    initFormData.overhead_fan
  );
  const [fieldBrakeLight, setFieldBrakeLight] = useState(
    initFormData.brake_light
  );
  const [fieldHeadlights, setFieldHeadlights] = useState(
    initFormData.headlights
  );
  const [fieldTurnSignals, setFieldTurnSignals] = useState(
    initFormData.turn_signals
  );
  const [fieldMirrorRearview, setFieldMirrorRearview] =
    useState(initFormData.rearview_mirror);
  const [fieldMirrorSideview, setFieldMirrorSideview] =
    useState(initFormData.sideview_mirror);
  const [fieldSeatbelts, setFieldSeatbelts] = useState(
    initFormData.seatbelts
  );
  const [fieldSeats, setFieldSeats] = useState(
    initFormData.seats
  );
  const [fieldTires, setFieldTires] = useState(
    initFormData.tires
  );
  const [fieldTopics, setFieldTopics] = useState(
    initFormData.topics
  );
  const [fieldVehicle, setFieldVehicle] = useState(
    initFormData.vehicle
  );
  const { revalidate } = useRevalidator();

  const handleClear = () => {
    setFieldDate(dayjs(initFormData.datetime));
    setFieldTime(dayjs(initFormData.datetime));
    setFieldTitle(initFormData.title);
    setFieldContent(initFormData.content);
    setFieldFrame(initFormData.frame);
    setFieldWindows(initFormData.windows);
    setFieldFrontCam(initFormData.front_camera);
    setFieldFanOverhead(initFormData.overhead_fan);
    setFieldBrakeLight(initFormData.brake_light);
    setFieldHeadlights(initFormData.headlights);
    setFieldTurnSignals(initFormData.turn_signals);
    setFieldMirrorRearview(initFormData.rearview_mirror);
    setFieldMirrorSideview(initFormData.sideview_mirror);
    setFieldSeatbelts(initFormData.seatbelts);
    setFieldSeats(initFormData.seats);
    setFieldTires(initFormData.tires);
    setFieldTopics(initFormData.topics);
    setFieldVehicle(initFormData.vehicle);
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

    const formData: VehicleReportInspectionFormData = {
      datetime,
      vehicle: fieldVehicle,
      topics: fieldTopics
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),
      content: fieldContent.trim(),
      title: fieldTitle.trim() || "ผลการตรวจสภาพรถรับส่ง",
      frame: fieldFrame.trim() || "ปกติ",
      windows: fieldWindows.trim() || "ปกติ",
      front_camera: fieldFrontCam.trim() || "ปกติ",
      overhead_fan: fieldFanOverhead.trim() || "ปกติ",
      brake_light: fieldBrakeLight.trim() || "ปกติ",
      headlights: fieldHeadlights.trim() || "ปกติ",
      turn_signals: fieldTurnSignals.trim() || "ปกติ",
      rearview_mirror: fieldMirrorRearview.trim() || "ปกติ",
      sideview_mirror: fieldMirrorSideview.trim() || "ปกติ",
      seatbelts: fieldSeatbelts.trim() || "ปกติ",
      seats: fieldSeats.trim() || "ปกติ",
      tires: fieldTires.trim() || "ปกติ",
    };

    (editing
      ? tauriPutVehicleReportInspection(
          props.report.id,
          formData
        )
      : tauriPostVehicleReportInspection(formData)
    )
      .then(
        () => {
          toast.success(
            editing ? "แก้ไขสำเร็จ" : "เพิ่มสำเร็จ"
          );
          revalidate();
        },
        () =>
          toast.error(
            editing ? "แก้ไข้ล้มเหลว" : "เพิ่มล้มเหลว"
          )
      )
      .finally(() => {
        handleClear();
        onClose();
      });
  };

  const isDateValid = fieldDate.isValid();
  const isTimeValid = fieldTime.isValid();
  const isFormIncomplete = !isDateValid || !isTimeValid;

  const disabledReasons: string[] = [];
  if (!isTimeValid) {
    disabledReasons.push("เวลาไม่ถูกต้อง");
  }
  if (!isDateValid) {
    disabledReasons.push("วันที่ไม่ถูกต้อง");
  }

  const formItems = [
    {
      label: "เวลา",
      value: (
        <BaseInputTimeField
          value={fieldTime}
          onChange={setFieldTime}
        />
      ),
    },
    {
      label: "วัน/เดือน/ปี",
      value: (
        <BaseInputDateField
          value={fieldDate}
          onChange={setFieldDate}
        />
      ),
    },
    {
      label: "เลขทะเบียน",
      value: (
        <VehicleInputVehicle
          {...slotProps.form.vehicleSelect}
          value={fieldVehicle}
          onChange={setFieldVehicle}
        />
      ),
    },
    {
      label: "ชื่อเรื่อง",
      value: (
        <BaseInputTextField
          value={fieldTitle}
          onChange={setFieldTitle}
          placeholder="ผลการตรวจสภาพรถรับส่ง"
        />
      ),
    },
    {
      label: "กล้องหน้ารถ",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldFrontCam}
          onChange={setFieldFrontCam}
        />
      ),
    },
    {
      label: "เข็มขัดนิรภัย",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldSeatbelts}
          onChange={setFieldSeatbelts}
        />
      ),
    },
    {
      label: "ที่นั่งและเบาะ",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldSeats}
          onChange={setFieldSeats}
        />
      ),
    },
    {
      label: "พัดลม",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldFanOverhead}
          onChange={setFieldFanOverhead}
        />
      ),
    },
    {
      label: "หน้าต่าง",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldWindows}
          onChange={setFieldWindows}
        />
      ),
    },
    {
      label: "ไฟหน้า",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldHeadlights}
          onChange={setFieldHeadlights}
        />
      ),
    },
    {
      label: "ไฟเบรค",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldBrakeLight}
          onChange={setFieldBrakeLight}
        />
      ),
    },
    {
      label: "ไฟเลี้ยว",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldTurnSignals}
          onChange={setFieldTurnSignals}
        />
      ),
    },
    {
      label: "ตัวรถ",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldFrame}
          onChange={setFieldFrame}
        />
      ),
    },
    {
      label: "กระจกมองหลัง",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldMirrorRearview}
          onChange={setFieldMirrorRearview}
        />
      ),
    },
    {
      label: "กระจกมองข้าง",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldMirrorSideview}
          onChange={setFieldMirrorSideview}
        />
      ),
    },
    {
      label: "ยางและล้อ",
      value: (
        <BaseInputTextField
          placeholder="ปกติ"
          multiline
          minRows={2}
          value={fieldTires}
          onChange={setFieldTires}
        />
      ),
    },
    {
      label: "รายละเอียดเพิ่มเติม",
      value: (
        <BaseInputTextField
          multiline
          minRows={6}
          value={fieldContent}
          onChange={setFieldContent}
          placeholder={initFormData.content}
        />
      ),
    },
    {
      label: "หัวข้อที่เกี่ยวข้อง",
      value: (
        <BaseInputTopicComboBox
          {...slotProps.form.topicComboBox}
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
          disabledReasons,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
      open={open}
      onClose={onClose}
      title={title}
    >
      {formItems}
    </BaseForm>
  );
};
