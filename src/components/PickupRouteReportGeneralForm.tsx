import { tauriPostPickupRouteReportGeneral } from "$backend/database/post";
import { tauriPutPickupRouteReportGeneral } from "$backend/database/put";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { AddRounded, SaveRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputDateField } from "./BaseInputDateField";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";
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
    submitButtonStartIcon = <SaveRounded />;
    initFormData = props.initFormData;
  } else {
    title = "Create new route report"; // TODO: translate
    submitButtonLabel = "Create"; // TODO: translate
    submitButtonStartIcon = <AddRounded />;
    initFormData = {
      datetime: dayjs().format(),
      route: slotProps.routeSelect.options[0],
      content: "",
      title: "",
      topics: [],
    };
  }

  const [fieldDate, setFieldDate] = useState(dayjs(initFormData.datetime));
  const [fieldTime, setFieldTime] = useState(dayjs(initFormData.datetime));
  const [fieldTitle, setFieldTitle] = useState(initFormData.title);
  const [fieldContent, setFieldContent] = useState(initFormData.content);
  const [fieldTopics, setFieldTopics] = useState(initFormData.topics);
  const [fieldRoute, setFieldRoute] = useState(initFormData.route);

  const { revalidate } = useRevalidator();

  const clearForm = () => {
    setFieldDate(dayjs(initFormData.datetime));
    setFieldTime(dayjs(initFormData.datetime));
    setFieldTitle(initFormData.title);
    setFieldContent(initFormData.content);
    setFieldTopics(initFormData.topics);
    setFieldRoute(initFormData.route);
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
      tauriPutPickupRouteReportGeneral(props.reportId, formData)
        .then(
          () => {
            toast.success(
              "Route report updated successfully" // TODO: translate
            );
            revalidate();
          },
          () =>
            toast.error(
              "Failed to update route report" // TODO: translate
            )
        )
        .finally(() => {
          clearForm();
          onClose();
        });
    } else {
      tauriPostPickupRouteReportGeneral(formData)
        .then(
          () => {
            toast.success(
              "Route report created successfully" // TODO: translate
            );
            revalidate();
          },
          () =>
            toast.error(
              "Failed to create route report"
              // TODO: translate
            )
        )
        .finally(() => {
          clearForm();
          onClose();
        });
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
