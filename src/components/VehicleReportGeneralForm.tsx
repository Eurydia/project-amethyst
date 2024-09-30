import { tauriPostVehicleReportGeneral } from "$backend/database/post";
import { tauriPutVehicleReportGeneral } from "$backend/database/put";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general";
import { VehicleModel } from "$types/models/vehicle";
import {
  VehicleReportGeneralFormData,
  VehicleReportGeneralModel,
} from "$types/models/vehicle-report-general";
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

  // TODO: translate
  let submitButtonLabel = "Add";
  let submitButtonStartIcon = <AddRounded />;
  let title = "Add vehicle report";
  let initFormData =
    VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toFormData(
      undefined,
      slotProps.vehcleSelect.options[0]
    );
  if (editing) {
    submitButtonLabel = "Save";
    submitButtonStartIcon = <SaveRounded />;
    title = "Edit Report";
    initFormData =
      VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toFormData(
        props.report,
        slotProps.vehcleSelect.options[0]
      );
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
  const [fieldVehicle, setFieldVehicle] = useState(
    initFormData.vehicle
  );
  const { revalidate } = useRevalidator();

  const clearForm = () => {
    setFieldDate(dayjs());
    setFieldTime(dayjs());
    setFieldTitle("");
    setFieldContent("");
    setFieldTopics([]);
    setFieldVehicle(slotProps.vehcleSelect.options[0]);
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
      content: fieldContent.normalize().trim(),
      title: fieldTitle.normalize().trim(),
      topics: fieldTopics
        .map((topic) => topic.normalize().trim())
        .filter((topic) => topic.length > 0),
      vehicle: fieldVehicle,
    };

    if (editing) {
      tauriPutVehicleReportGeneral(
        props.report.id,
        formData
      )
        .then(
          () => {
            toast.success("Save success");
            revalidate();
          },
          () => toast.error("Save failed")
        )
        .finally(() => {
          clearForm();
          onClose();
        });
    } else {
      tauriPostVehicleReportGeneral(formData)
        .then(
          () => {
            toast.success("Save success");
            revalidate();
          },
          () => toast.error("Save failed")
        )
        .finally(() => {
          clearForm();
          onClose();
        });
    }
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
          startIcon: submitButtonStartIcon,
          children: submitButtonLabel,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
