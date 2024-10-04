import { DriverModel } from "$types/models/driver";
import { DriverReportModel } from "$types/models/driver-report";
import { SaveRounded } from "@mui/icons-material";
import { default as dayjs } from "dayjs";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputDateField } from "./BaseInputDateField";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { DriverInputDriverSelect } from "./DriverInputDriverSelect";

type DriverReportMedicalFormPostProps = {
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

type DriverReportMedicalFormPutProps = {
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

type DriverReportMedicalFormProps =
  | DriverReportMedicalFormPostProps
  | DriverReportMedicalFormPutProps;
export const DriverReportMedicalForm: FC<
  DriverReportMedicalFormProps
> = (props) => {
  const { slotProps, onClose, open, editing } = props;

  let title = "Add new report"; // TODO: translate
  let initFormData = {
    datetime: dayjs().format(),
    title: "",
    content: "",
    topics: [],
    driver: slotProps.driverSelect.options[0],
  };
  let submitButtonLabel = "Post report"; // TODO: translate
  let submitButtonStartIcon = <SaveRounded />;
  if (editing) {
    title = "Edit report"; // TODO: translate
    initFormData = props.initFormData;
    submitButtonLabel = "Save changes"; // TODO: translate
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
    setFieldDate(dayjs());
    setFieldTime(dayjs());
    setFieldTitle("");
    setFieldContent("");
    setFieldTopics([]);
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
      driver: fieldDriver,

      topics: fieldTopics
        .map((topic) => topic.trim().normalize())
        .filter((topic) => topic.length > 0),
      content: fieldContent.normalize().trim(),
      title: fieldTitle.normalize().trim(),

      datetime,
    };
    if (editing) {
      tauriPutDriverReportGeneral(props.reportId, formData)
        .then(
          () => {
            toast.success(
              "Report updated" // TODO: translate
            );
            revalidate();
          },
          () =>
            toast.error(
              "Failed to update report" // TODO: translate
            )
        )
        .finally(() => {
          clearForm();
          onClose();
        });
    } else {
      tauriPostDriverReportGeneral(formData)
        .then(
          () => {
            toast.success(
              "Report posted" // TODO: translate
            );
            revalidate();
          },
          () =>
            toast.error(
              "Failed to post report" // TODO: translate
            )
        )
        .finally(() => {
          clearForm();
          onClose();
        });
    }
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
          options={slotProps.topicComboBox.options}
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
