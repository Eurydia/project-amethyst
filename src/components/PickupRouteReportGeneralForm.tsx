import { tauriPostPickupRouteReportGeneral } from "$backend/database/post";
import { tauriPutPickupRouteReportGeneral } from "$backend/database/put";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general";
import { PickupRouteModel } from "$types/models/pickup-route";
import {
  PickupRouteReportGeneralFormData,
  PickupRouteReportGeneralModel,
} from "$types/models/pickup-route-report-general";
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
import { PickupRouteInputPickupRouteSelect } from "./PickupRouteInputPickupRouteSelect";

type PickupRouteReportGeneralPostFormProps = {
  editing: false;
  open: boolean;
  onClose: () => void;
  slotProps: {
    routeSelect: {
      disabled?: boolean;
      options: PickupRouteModel[];
    };
    topicComboBox: {
      options: string[];
    };
  };
};

type PickupRouteReportGeneralPutFormProps = {
  editing: true;
  report: PickupRouteReportGeneralModel;

  open: boolean;
  onClose: () => void;
  slotProps: {
    routeSelect: {
      disabled?: boolean;
      options: PickupRouteModel[];
    };
    topicComboBox: {
      options: string[];
    };
  };
};

type PickupRouteReportGeneralFormProps =
  | PickupRouteReportGeneralPostFormProps
  | PickupRouteReportGeneralPutFormProps;

export const PickupRouteReportGeneralForm: FC<
  PickupRouteReportGeneralFormProps
> = (props) => {
  const { onClose, open, slotProps, editing } = props;
  const initFormData =
    PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toFormData(
      editing ? props.report : undefined,
      slotProps.routeSelect.options[0]
    );
  const title = editing ? (
    <Fragment>
      <Typography variant="h2">
        {initFormData.route.name}
      </Typography>
      <Typography variant="h3">
        แก้ไขข้อมูลเรื่องร้องเรียนสายรถ
      </Typography>
    </Fragment>
  ) : (
    <Typography variant="h2">
      เพิ่มเรื่องร้องเรียนสายรถ
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
  const [fieldRoute, setFieldRoute] = useState(
    initFormData.route
  );

  const { revalidate } = useRevalidator();

  const handleReset = () => {
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
      datetime,
      route: fieldRoute,
      title: fieldTitle.trim() || "เรื่องร้องเรียนสายรถ",
      content: fieldContent.trim(),
      topics: fieldTopics
        .map((topic) => topic.trim())
        .filter((topic) => topic.trim().length > 0),
    };

    (editing
      ? tauriPutPickupRouteReportGeneral(
          props.report.id,
          formData
        )
      : tauriPostPickupRouteReportGeneral(formData)
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

  const isTimeValid = dayjs(fieldDate).isValid();
  const isDateValid = dayjs(fieldTime).isValid();
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
      label: "สายรถ",
      value: (
        <PickupRouteInputPickupRouteSelect
          {...slotProps.routeSelect}
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
          value={fieldTitle}
          onChange={setFieldTitle}
          placeholder="เรื่องร้องเรียนสายรถ"
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
      title={title}
      slotProps={{
        submitButton: {
          disabledReasons,
          disabled: isFormIncomplete,
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
