import { DriverModel } from "$types/models/driver";
import { DriverReportFormData } from "$types/models/driver-report";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputDateField } from "./BaseInputDateField";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { DriverInputDriverSelect } from "./DriverInputDriverSelect";

type DriverReportFormProps = {
  initFormData: DriverReportFormData;
  slotProps: {
    submitButton: {
      startIcon: ReactNode;
      label: string;
      onClick: (formData: DriverReportFormData) => void;
    };
    cancelButton: {
      onClick: () => void;
      label: string;
    };

    titleField: {
      label: string;
    };
    contentField: {
      label: string;
    };
    timeField: {
      label: string;
    };
    dateField: {
      label: string;
    };
    driverSelect: {
      label: string;
      options: DriverModel[];
      disabled?: boolean;
    };
    topicComboBox: {
      label: string;
      options: string[];
    };
  };
};
export const DriverReportForm: FC<DriverReportFormProps> = (
  props,
) => {
  const { initFormData, slotProps } = props;

  const [fieldDate, setFieldDate] = useState(
    dayjs(initFormData.datetime),
  );
  const [fieldTime, setFieldTime] = useState(
    dayjs(initFormData.datetime),
  );
  const [fieldTitle, setFieldTitle] = useState(
    initFormData.title,
  );
  const [fieldContent, setFieldContent] = useState(
    initFormData.content,
  );
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

    slotProps.submitButton.onClick({
      driver: fieldDriver,
      content: fieldContent.normalize().trim(),
      title: fieldTitle.normalize().trim(),
      topics: fieldTopics
        .map((topic) => topic.trim().normalize())
        .filter((topic) => topic.length > 0),

      datetime,
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
      label: slotProps.timeField.label,
      value: (
        <BaseInputTimeField
          value={fieldTime}
          onChange={setFieldTime}
        />
      ),
    },
    {
      label: slotProps.dateField.label,
      value: (
        <BaseInputDateField
          value={fieldDate}
          onChange={setFieldDate}
        />
      ),
    },
    {
      label: slotProps.driverSelect.label,
      value: (
        <DriverInputDriverSelect
          disabled={slotProps.driverSelect.disabled}
          options={slotProps.driverSelect.options}
          value={fieldDriver}
          onChange={setFieldDriver}
        />
      ),
    },
    {
      label: slotProps.titleField.label,
      value: (
        <BaseInputTextField
          shouldAutoFocus
          onChange={setFieldTitle}
          placeholder={initFormData.title}
          value={fieldTitle}
          isError={isMissingTitle}
        />
      ),
    },
    {
      label: slotProps.contentField.label,
      value: (
        <BaseInputTextField
          multiline
          minRows={6}
          value={fieldContent}
          isError={isMissingContent}
          placeholder={initFormData.content}
          onChange={setFieldContent}
        />
      ),
    },
    {
      label: slotProps.topicComboBox.label,
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
          onClick: handleSubmit,
          label: slotProps.submitButton.label,
          startIcon: slotProps.submitButton.startIcon,
        },
        cancelButton: {
          onClick: slotProps.cancelButton.onClick,
          label: slotProps.cancelButton.label,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
