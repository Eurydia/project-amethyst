import { tauriPostDriverReportGeneral } from "$backend/database/post";
import { tauriPutDriverReportGeneral } from "$backend/database/put";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report";
import { DriverModel } from "$types/models/driver";
import {
  DriverReportFormData,
  DriverReportModel,
} from "$types/models/driver-report";
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
import { DriverInputDriverSelect } from "./DriverInputDriverSelect";

type DriverReportGeneralFormPostProps = {
  editing: false;
  open: boolean;
  onClose: () => void;
  slotProps: {
    driverSelect: {
      disabled?: boolean;
      options: DriverModel[];
    };
    topicComboBox: {
      options: string[];
    };
  };
};

type DriverReportGeneralFormPutProps = {
  report: DriverReportModel;

  editing: true;
  open: boolean;
  onClose: () => void;
  slotProps: {
    driverSelect: {
      disabled?: boolean;
      options: DriverModel[];
    };
    topicComboBox: {
      options: string[];
    };
  };
};

type DriverReportGeneralFormProps =
  | DriverReportGeneralFormPostProps
  | DriverReportGeneralFormPutProps;
export const DriverReportGeneralForm: FC<
  DriverReportGeneralFormProps
> = (props) => {
  const { slotProps, onClose, open, editing } = props;

  const initFormData =
    DRIVER_REPORT_MODEL_TRANSFORMER.toFormData(
      editing ? props.report : undefined,
      slotProps.driverSelect.options[0]
    );
  const title = editing ? (
    <Fragment>
      <Typography variant="h2">
        {initFormData.driver.name}
        {initFormData.driver.surname}
      </Typography>
      <Typography variant="h3">
        แก้ไขข้อมูลเรื่องร้องเรียนคนขับรถ
      </Typography>
    </Fragment>
  ) : (
    <Typography variant="h2">
      เพิ่มเรื่องร้องเรียนคนขับรถ
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
  const [fieldDriver, setFieldDriver] = useState(
    initFormData.driver
  );

  const { revalidate } = useRevalidator();

  const clearForm = () => {
    setFieldDate(dayjs(initFormData.datetime));
    setFieldTime(dayjs(initFormData.datetime));
    setFieldTitle(initFormData.title);
    setFieldContent(initFormData.content);
    setFieldTopics(initFormData.topics);
    setFieldDriver(initFormData.driver);
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
      datetime,
      driver: fieldDriver,
      title: fieldTitle.trim() || "เรื่องร้องเรียนคนขับรถ",
      content: fieldContent.trim(),
      topics: fieldTopics
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),
    };
    (editing
      ? tauriPutDriverReportGeneral(
          props.report.id,
          formData
        )
      : tauriPostDriverReportGeneral(formData)
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
        clearForm();
        onClose();
      });
  };

  const isTimeValid = fieldTime.isValid();
  const isDateValid = fieldDate.isValid();
  const isFormIncomplete = !isTimeValid || !isDateValid;

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
      label: "คนขับรถ",
      value: (
        <DriverInputDriverSelect
          {...slotProps.driverSelect}
          value={fieldDriver}
          onChange={setFieldDriver}
        />
      ),
    },
    {
      label: "เรื่อง",
      value: (
        <BaseInputTextField
          autoFocus
          onChange={setFieldTitle}
          placeholder="เรื่องร้องเรียนคนขับรถ"
          value={fieldTitle}
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
