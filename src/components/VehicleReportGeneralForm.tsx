import { tauriPostVehicleReportGeneral } from "$backend/database/post";
import { tauriPutVehicleReportGeneral } from "$backend/database/put";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general";
import { VehicleModel } from "$types/models/vehicle";
import {
  VehicleReportGeneralFormData,
  VehicleReportGeneralModel,
} from "$types/models/vehicle-report-general";
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

type VehicleReportGeneralPostFormProps = {
  editing: false;
  open: boolean;
  onClose: () => void;

  slotProps: {
    topicComboBox: {
      options: string[];
    };
    vehcleSelect: {
      options: VehicleModel[];
      disabled?: boolean;
    };
  };
};

type VehicleReportGeneralPutFormProps = {
  editing: true;
  open: boolean;
  onClose: () => void;
  report: VehicleReportGeneralModel;

  slotProps: {
    topicComboBox: {
      options: string[];
    };
    vehcleSelect: {
      options: VehicleModel[];
      disabled?: boolean;
    };
  };
};

type VehicleReportGeneralFormProps =
  | VehicleReportGeneralPostFormProps
  | VehicleReportGeneralPutFormProps;
export const VehicleReportGeneralForm: FC<
  VehicleReportGeneralFormProps
> = (props) => {
  const { editing, slotProps, onClose, open } = props;
  const initFormData =
    VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toFormData(
      editing ? props.report : undefined,
      slotProps.vehcleSelect.options[0]
    );
  const title = editing ? (
    <Fragment>
      <Typography variant="h2">
        {initFormData.vehicle.license_plate}
      </Typography>
      <Typography variant="h3">
        แก้ไขข้อมูลเรื่องร้องเรียนรถรับส่ง
      </Typography>
    </Fragment>
  ) : (
    <Typography variant="h2">
      เพิ่มเรื่องร้องเรียนรถรับส่ง
    </Typography>
  );

  const [fieldDate, setFieldDate] = useState(
    dayjs(initFormData.datetime)
  );
  const [fieldTime, setFieldTime] = useState(
    dayjs(initFormData.datetime)
  );
  const [fieldTitle, setFieldTitle] = useState(
    initFormData.title
  );
  const [fieldContent, setFieldContent] = useState(
    initFormData.content
  );
  const [fieldTopics, setFieldTopics] = useState(
    initFormData.topics
  );
  const [fieldVehicle, setFieldVehicle] = useState(
    initFormData.vehicle
  );
  const { revalidate } = useRevalidator();

  const handleReset = () => {
    setFieldDate(dayjs(initFormData.datetime));
    setFieldTime(dayjs(initFormData.datetime));
    setFieldTitle(initFormData.title);
    setFieldContent(initFormData.content);
    setFieldTopics(initFormData.topics);
    setFieldVehicle(initFormData.vehicle);
  };

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }

    const datetime = fieldDate
      .set("hour", fieldTime.hour())
      .set("minute", fieldTime.minute())
      .set("second", fieldTime.second())
      .set("millisecond", fieldTime.millisecond())
      .format();

    const formData: VehicleReportGeneralFormData = {
      datetime,
      vehicle: fieldVehicle,
      title: fieldTitle.trim() || "เรื่องร้องเรียนรถรับส่ง",
      content: fieldContent.trim(),
      topics: fieldTopics
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),
    };

    (editing
      ? tauriPutVehicleReportGeneral(
          props.report.id,
          formData
        )
      : tauriPostVehicleReportGeneral(formData)
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
            editing ? "แก้ไขล้มเหลว" : "เพิ่มล้มเหลว"
          )
      )
      .finally(() => {
        handleReset();
        onClose();
      });
  };

  const isDateValid = dayjs(fieldDate).isValid();
  const isTimeValid = dayjs(fieldTime).isValid();
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
      label: "รถรับส่ง",
      value: (
        <VehicleInputVehicle
          {...slotProps.vehcleSelect}
          value={fieldVehicle}
          onChange={setFieldVehicle}
        />
      ),
    },
    {
      label: "เรื่อง",
      value: (
        <BaseInputTextField
          autoFocus
          value={fieldTitle}
          onChange={setFieldTitle}
          placeholder="เรื่องร้องเรียนรถรับส่ง"
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
          onChange={setFieldContent}
        />
      ),
    },
    {
      label: "หัวข้อที่เกี่ยวข้อง",
      value: (
        <BaseInputTopicComboBox
          {...slotProps.topicComboBox}
          values={fieldTopics}
          onChange={setFieldTopics}
        />
      ),
    },
  ];

  return (
    <BaseForm
      onClose={onClose}
      open={open}
      title={title}
      slotProps={{
        submitButton: {
          disabledReasons,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
