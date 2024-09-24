import { tauriPostDriver } from "$backend/database/post";
import { tauriPutDriver } from "$backend/database/put";
import { DriverFormData } from "$types/models/driver";
import {
  AddRounded,
  SaveRounded,
  WarningRounded,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { DriverInputLicenseTypeRadioGroup } from "./DriverInputLicenseTypeRadioGroup";

type DriverFormPostProps = {
  editing?: false | undefined;
  open: boolean;
  onClose: () => void;
};

type DriverFormPutProps = {
  editing: true;
  open: boolean;
  driverId: number;
  initFormData: DriverFormData;
  onClose: () => void;
};

type DriverFormProps =
  | DriverFormPostProps
  | DriverFormPutProps;

export const DriverForm: FC<DriverFormProps> = (props) => {
  const { onClose, open, editing } = props;

  let title: string;
  let initFormData: DriverFormData;
  let submitButtonLabel: string;
  let submitButtonStartIcon: ReactNode;
  if (editing) {
    title = "Edit driver info"; // TODO: translate
    initFormData = props.initFormData;
    submitButtonLabel = "Save"; // TODO: translate
    submitButtonStartIcon = <SaveRounded />;
  } else {
    title = "Add new driver"; // TODO: translate
    initFormData = {
      name: "",
      surname: "",
      contact: "",
      licenseType: "",
    };
    submitButtonLabel = "Add driver"; // TODO: translate
    submitButtonStartIcon = <AddRounded />;
  }

  const [fieldName, setFieldName] = useState(
    initFormData.name
  );
  const [fieldSurname, setFielSurname] = useState(
    initFormData.surname
  );
  const [fieldContact, setFieldContact] = useState(
    initFormData.contact
  );
  const [fieldLicenseType, setFieldLicenseType] = useState(
    initFormData.licenseType
  );

  const { revalidate } = useRevalidator();
  const resetForm = () => {
    setFieldName(initFormData.name);
    setFielSurname(initFormData.surname);
    setFieldContact(initFormData.contact);
    setFieldLicenseType(initFormData.licenseType);
  };

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    const contact = fieldContact.trim().normalize();
    const formData: DriverFormData = {
      name: fieldName.trim().normalize(),
      surname: fieldSurname.trim().normalize(),
      contact: contact.length > 0 ? contact : "ไม่มี",
      licenseType: fieldLicenseType,
    };
    if (editing) {
      tauriPutDriver(props.driverId, formData)
        .then(
          () => {
            toast.success(
              "Driver info updated" // TODO: translate
            );
            revalidate();
          },
          () =>
            toast.error(
              "Failed to update driver info" // TODO: translate
            )
        )
        .finally(() => {
          resetForm();
          onClose();
        });
    } else {
      tauriPostDriver(formData)
        .then(
          () => {
            toast.success(
              "Driver added" // TODO: translate
            );
            revalidate();
          },
          () =>
            toast.error(
              "Failed to add driver" // TODO: translate
            )
        )
        .finally(() => {
          resetForm();
          onClose();
        });
    }
  };

  const isMissingName = fieldName.trim().normalize() === "";
  const isMissingSurname =
    fieldSurname.trim().normalize() === "";
  const isFormIncomplete =
    isMissingName || isMissingSurname;

  const formItems: {
    label: string;
    value: ReactNode;
  }[] = [
    {
      label: "ชื่อ",
      value: (
        <BaseInputTextField
          autoFocus
          error={isMissingName}
          placeholder={initFormData.name}
          value={fieldName}
          onChange={setFieldName}
          helperText={
            isMissingName && (
              <Typography>
                <WarningRounded />
                Required
                {/* 
                 TODO: translate
                 */}
              </Typography>
            )
          }
        />
      ),
    },
    {
      label: "นามสกุล",
      value: (
        <BaseInputTextField
          error={isMissingSurname}
          value={fieldSurname}
          placeholder={initFormData.surname}
          onChange={setFielSurname}
          helperText={
            // TODO: translate
            isMissingName && (
              <Typography>
                <WarningRounded />
                Required
              </Typography>
            )
          }
        />
      ),
    },
    {
      label: "เบอร์ติดต่อ",
      value: (
        <BaseInputTextField
          placeholder={
            initFormData.contact.trim().length > 0
              ? initFormData.contact.trim()
              : "ไม่มี"
          }
          value={fieldContact}
          onChange={setFieldContact}
        />
      ),
    },
    {
      label: "ประเภทใบขับขี่",
      value: (
        <DriverInputLicenseTypeRadioGroup
          value={fieldLicenseType}
          onChange={setFieldLicenseType}
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
          disabled: isFormIncomplete,
          startIcon: submitButtonStartIcon,
          children: submitButtonLabel,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
