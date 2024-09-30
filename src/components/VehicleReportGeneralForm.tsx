import { tauriPostVehicleReportGeneral } from "$backend/database/post";
import { tauriPutVehicleReportGeneral } from "$backend/database/put";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
import { SaveRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
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
  reportId: number;
  initFormData: VehicleReportGeneralFormData;

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
  let submitButtonLabel: string;
  let submitButtonStartIcon: ReactNode;
  let title: string;
  let initFormData: VehicleReportGeneralFormData;
  if (editing) {
    submitButtonLabel = "Save"; // TODO: translate
    submitButtonStartIcon = <SaveRounded />;
    title = "Edit Report"; // TODO: translate
    initFormData = props.initFormData;
  } else {
    submitButtonLabel = "Create"; // TODO: translate
    submitButtonStartIcon = <SaveRounded />;
    title = "New Report"; // TODO: translate
    initFormData = {
      datetime: dayjs().format(),
      content: "",
      title: "",
      topics: [],
      vehicle: slotProps.vehcleSelect.options[0],
    };
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
      content: fieldContent.normalize().trim(),
      datetime: datetime,
      title: fieldTitle.normalize().trim(),
      topics: fieldTopics
        .map((topic) => topic.normalize().trim())
        .filter((topic) => topic.length > 0),
      vehicle: fieldVehicle,
    };

    if (editing) {
      tauriPutVehicleReportGeneral(props.reportId, formData)
        .then(
          () => toast.success("Save success"), // TODO: translate
          () => toast.error("Save failed") // TODO: translate
        )
        .finally(() => {
          clearForm();
          onClose();
        });
    } else {
      tauriPostVehicleReportGeneral(formData)
        .then(
          () => toast.success("Save success"), // TODO: translate
          () => toast.error("Save failed") // TODO: translate
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
