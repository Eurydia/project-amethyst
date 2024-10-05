import { tauriPostDriverReportGeneral } from "$backend/database/post";
import { tauriPutDriverReportGeneral } from "$backend/database/put";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report";
import { DriverModel } from "$types/models/driver";
import {
  DriverReportFormData,
  DriverReportModel,
} from "$types/models/driver-report";
import {
  AddRounded,
  SaveRounded,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputDateField } from "./BaseInputDateField";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { DriverInputDriverSelect } from "./DriverInputDriverSelect";

type DriverReportGeneralFormPostProps = {
  editing?: false | undefined;
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

  let title = "ร้องเรียนคนขับรถ";
  let initFormData =
    DRIVER_REPORT_MODEL_TRANSFORMER.toFormData(
      slotProps.driverSelect.options[0]
    );
  let submitButtonLabel = "เพิ่ม";
  let submitButtonStartIcon = <AddRounded />;
  if (editing) {
    title = "แก้ไขข้อมูลเรื่องร้องเรียน";
    initFormData =
      DRIVER_REPORT_MODEL_TRANSFORMER.toFormData(
        slotProps.driverSelect.options[0],
        props.report
      );
    submitButtonLabel = "บันทึก";
    submitButtonStartIcon = <SaveRounded />;
  }

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
    setFieldDriver(slotProps.driverSelect.options[0]);
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
      topics: fieldTopics
        .map((topic) => topic.trim().normalize())
        .filter((topic) => topic.length > 0),
      content: fieldContent.normalize().trim(),
      title: fieldTitle.normalize().trim(),
    };
    let action = tauriPostDriverReportGeneral(
      formData
    ).then(
      () => {
        toast.success("เพิ่มสำเร็จ");
        revalidate();
      },
      () => toast.error("เพิ่มล้มเหลว")
    );
    if (editing) {
      action = tauriPutDriverReportGeneral(
        props.report.id,
        formData
      ).then(
        () => {
          toast.success("บันทึกสำเร็จ");
          revalidate();
        },
        () => toast.error("บันทึกล้มเหลว")
      );
    }
    await action.finally(() => {
      clearForm();
      onClose();
    });
  };

  const isMissingTime =
    Number.isNaN(fieldTime.hour()) ||
    Number.isNaN(fieldTime.minute());
  const isMissingDate =
    Number.isNaN(fieldDate.day()) ||
    Number.isNaN(fieldDate.month()) ||
    Number.isNaN(fieldDate.year());
  const isMissingTitle = fieldTitle.trim() === "";
  const isMissingContent = fieldContent.trim() === "";
  const isFormIncomplete =
    isMissingTitle || isMissingDate || isMissingTime;

  const formItems: {
    label: string;
    value: ReactNode;
  }[] = [
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
          placeholder={initFormData.title}
          value={fieldTitle}
          error={isMissingTitle}
          errorText="ต้องกรอกชื่อเรื่อง"
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
          error={isMissingContent}
          placeholder={initFormData.content}
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
          disabled: isFormIncomplete,
          children: submitButtonLabel,
          startIcon: submitButtonStartIcon,
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
