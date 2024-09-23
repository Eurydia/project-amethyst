/** @format */

import { usePostPickupRouteReportGeneral } from "$hooks/usePostPickupRouteReportGeneral";
import { usePutPickupRouteReportGeneral } from "$hooks/usePutPickupRouteReportGeneral";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { AddRounded, SaveRounded } from "@mui/icons-material";
import { DateField, TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTopicComboBox } from "./BaseInputTopicComboBox";
import { PickupRouteInputPickupRouteSelect } from "./PickupRouteInputPickupRouteSelect";

type PickupRouteReportGeneralFormProps = {
  open: boolean;
  onClose: () => void;
  slotProps: {
    topicComboBox: {
      options: string[];
    };
    routeSelect: {
      options: PickupRouteModel[];
      disabled?: boolean;
    };
  };
} & (
  | {
      editing: true;
      reportId: number;
      initFormData: PickupRouteReportGeneralFormData;
    }
  | {
      editing?: false | undefined;
    }
);
export const PickupRouteReportGeneralForm: FC<
  PickupRouteReportGeneralFormProps
> = (props) => {
  const { onClose, open, slotProps, editing } = props;

  let initFormData: PickupRouteReportGeneralFormData;
  let submitButtonLabel: string;
  let submitButtonStartIcon: ReactNode;
  let title: string;
  if (editing) {
    title = "Edit route report details"; // TODO: translate
    submitButtonLabel = "Save changes"; // TODO: translate
    initFormData = props.initFormData;
    submitButtonStartIcon = <SaveRounded />;
  } else {
    title = "Create new route report"; // TODO: translate
    submitButtonLabel = "Create"; // TODO: translate
    initFormData = {
      datetime: dayjs().format(),
      route: slotProps.routeSelect.options[0],
      content: "",
      title: "",
      topics: [],
    };
    submitButtonStartIcon = <AddRounded />;
  }

  const [fieldDate, setFieldDate] = useState(dayjs(initFormData.datetime));
  const [fieldTime, setFieldTime] = useState(dayjs(initFormData.datetime));
  const [fieldTitle, setFieldTitle] = useState(initFormData.title);
  const [fieldContent, setFieldContent] = useState(initFormData.content);
  const [fieldTopics, setFieldTopics] = useState(initFormData.topics);
  const [fieldRoute, setFieldRoute] = useState(initFormData.route);

  const { revalidate } = useRevalidator();
  const postReport = usePostPickupRouteReportGeneral();
  const putReport = usePutPickupRouteReportGeneral();
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

    const formData: PickupRouteReportGeneralFormData = {
      route: fieldRoute,
      content: fieldContent.normalize().trim(),
      datetime: datetime,
      title: fieldTitle.normalize().trim(),
      topics: fieldTopics
        .map((topic) => topic.normalize().trim())
        .filter((topic) => topic.trim().length > 0),
    };

    if (editing) {
      putReport(props.reportId, formData).finally(revalidate).then(onClose);
    } else {
      postReport(formData).finally(revalidate).then(onClose);
    }
  };

  const isTimeInvalid =
    Number.isNaN(fieldTime.hour()) || Number.isNaN(fieldTime.minute());
  const isDateInvalid =
    Number.isNaN(fieldDate.date()) ||
    Number.isNaN(fieldDate.month()) ||
    Number.isNaN(fieldDate.year());
  const isRouteEmpty = fieldRoute === null;
  const isTitleEmpty = fieldTitle.trim().length === 0;
  const isContentEmpty = fieldContent.trim().length === 0;
  const isFormIncomplete =
    isRouteEmpty ||
    isTitleEmpty ||
    isContentEmpty ||
    isTimeInvalid ||
    isDateInvalid;

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
      label: "สายรถ",
      value: (
        <PickupRouteInputPickupRouteSelect
          options={slotProps.routeSelect.options}
          isDisabled={slotProps.routeSelect.disabled}
          value={fieldRoute}
          onChange={setFieldRoute}
        />
      ),
    },
    {
      label: "เรื่อง",
      value: (
        <BaseInputTextField
          autoFocus
          error={isTitleEmpty}
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
          error={isContentEmpty}
          placeholder={initFormData.content}
          value={fieldContent}
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
      title={title}
      slotProps={{
        submitButton: {
          disabled: isFormIncomplete,
          startIcon: submitButtonStartIcon,
          children: submitButtonLabel,
          onClick: handleSubmit,
        },
      }}
      open={open}
      onClose={onClose}
    >
      {formItems}
    </BaseForm>
  );
};
