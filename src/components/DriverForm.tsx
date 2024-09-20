import { DriverFormData } from "$types/models/driver";
import { WarningRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { DriverInputLicenseTypeRadioGroup } from "./DriverInputLicenseTypeRadioGroup";

type DriverFormProps = {
  initFormData: DriverFormData;
  title: string;
  open: boolean;
  onClose: () => void;

  slotProps: {
    submitButton: {
      startIcon: ReactNode;
      label: string;
      onClick: (formData: DriverFormData) => void;
    };
  };
};
export const DriverForm: FC<DriverFormProps> = (props) => {
  const { initFormData, onClose, open, title, slotProps } =
    props;

  const [fieldName, setFieldName] = useState(
    initFormData.name,
  );
  const [fieldSurname, setFielSurname] = useState(
    initFormData.surname,
  );
  const [fieldContact, setFieldContact] = useState(
    initFormData.contact,
  );
  const [fieldLicenseType, setFieldLicenseType] = useState(
    initFormData.licenseType,
  );

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    slotProps.submitButton.onClick({
      name: fieldName.trim().normalize(),
      surname: fieldSurname.trim().normalize(),
      contact: fieldContact.trim().normalize() || "ไม่มี",
      licenseType: fieldLicenseType,
    });
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
          startIcon: slotProps.submitButton.startIcon,
          children: slotProps.submitButton.label,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
