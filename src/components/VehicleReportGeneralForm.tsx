import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
import { DateField, TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { VehicleInputSelect } from "./VehicleInputSelect";

type VehicleReportGeneralFormProps = {
  initFormData: VehicleReportGeneralFormData;

  slotProps: {
    submitButton: {
      startIcon: ReactNode;
      label: string;
      onClick: (
        formData: VehicleReportGeneralFormData,
      ) => void;
    };
    topicComboBox: {
      options: string[];
    };
    vehcleSelect: {
      options: VehicleModel[];
      disabled?: boolean;
    };
    cancelButton: {
      label: string;
      onClick: () => void;
    };
  };
};
export const VehicleReportGeneralForm: FC<
  VehicleReportGeneralFormProps
> = (props) => {
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
  const [fieldVehicle, setFieldVehicle] = useState(
    initFormData.vehicle,
  );

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

    slotProps.submitButton.onClick({
      content: fieldContent.normalize().trim(),
      datetime: datetime,
      title: fieldTitle.normalize().trim(),
      topics: fieldTopics
        .map((topic) => topic.normalize().trim())
        .filter((topic) => topic.length > 0),
      vehicle: fieldVehicle,
    });
  };

  const isVehicleEmpty = fieldVehicle === null;
  const isTitleEmpty = fieldTitle.trim().length === 0;
  const isFormIncomplete = isVehicleEmpty || isTitleEmpty;

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
      label: "รถรับส่ง",
      value: (
        <VehicleInputSelect
          disabled={slotProps.vehcleSelect.disabled}
          options={slotProps.vehcleSelect.options}
          value={fieldVehicle}
          onChange={setFieldVehicle}
        />
      ),
    },
    {
      label: "เรื่อง",
      value: (
        <BaseInputTextField
          shouldAutoFocus
          isError={isTitleEmpty}
          value={fieldTitle}
          onChange={setFieldTitle}
          placeholder={initFormData.title}
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
          placeholder={initFormData.content}
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
          startIcon: slotProps.submitButton.startIcon,
          label: slotProps.submitButton.label,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
        cancelButton: {
          label: slotProps.cancelButton.label,
          onClick: slotProps.cancelButton.onClick,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
