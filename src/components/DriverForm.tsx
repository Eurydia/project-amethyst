import { tauriPostDriver } from "$backend/database/post";
import { tauriPutDriver } from "$backend/database/put";
import { DRIVER_MODEL_TRANSFORMER } from "$core/transformers/driver";
import {
  DriverFormData,
  DriverModel,
} from "$types/models/driver";
import { Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { DriverInputLicenseType } from "./DriverInputLicenseType";

type DriverFormPostProps = {
  editing: false;
  open: boolean;
  onClose: () => void;
};

type DriverFormPutProps = {
  driver: DriverModel;
  editing: true;
  open: boolean;
  onClose: () => void;
};

type DriverFormProps =
  | DriverFormPostProps
  | DriverFormPutProps;

export const DriverForm: FC<DriverFormProps> = (props) => {
  const { onClose, open, editing } = props;

  const initFormData: DriverFormData =
    DRIVER_MODEL_TRANSFORMER.toFormData(
      editing ? props.driver : undefined
    );
  const title = editing ? (
    <Fragment>
      <Typography variant="h2">
        {initFormData.name} {initFormData.surname}
      </Typography>
      <Typography variant="h3">
        แก้ไขข้อมูลคนขับรถ
      </Typography>
    </Fragment>
  ) : (
    <Typography variant="h2">ลงทะเบียนคนขับรถ</Typography>
  );

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
    initFormData.license_type
  );

  const { revalidate } = useRevalidator();
  const resetForm = () => {
    setFieldName(initFormData.name);
    setFielSurname(initFormData.surname);
    setFieldContact(initFormData.contact);
    setFieldLicenseType(initFormData.license_type);
  };

  const handleSubmit = async () => {
    if (isFormIncomplete) {
      return;
    }
    const formData: DriverFormData = {
      name: fieldName,
      surname: fieldSurname,
      contact: fieldContact,
      license_type: fieldLicenseType,
    };

    (editing
      ? tauriPutDriver(props.driver.id, formData)
      : tauriPostDriver(formData)
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
        resetForm();
        onClose();
      });
  };

  const isMissingName = fieldName.trim().length === 0;
  const isMissingSurname = fieldSurname.trim().length === 0;
  const isFormIncomplete =
    isMissingName || isMissingSurname;

  const disabledReasons: string[] = [];
  if (isMissingName) {
    disabledReasons.push("ต้องมีชื่อ");
  }
  if (isMissingSurname) {
    disabledReasons.push("ต้องมีนามสกุล");
  }

  const formItems = [
    {
      label: "ชื่อ",
      value: (
        <BaseInputTextField
          autoFocus
          error={isMissingName}
          value={fieldName}
          onChange={setFieldName}
        />
      ),
    },
    {
      label: "นามสกุล",
      value: (
        <BaseInputTextField
          error={isMissingSurname}
          value={fieldSurname}
          onChange={setFielSurname}
        />
      ),
    },
    {
      label: "เบอร์ติดต่อ",
      value: (
        <BaseInputTextField
          value={fieldContact}
          onChange={setFieldContact}
        />
      ),
    },
    {
      label: "ประเภทใบขับขี่",
      value: (
        <DriverInputLicenseType
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
          disabledReasons,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
