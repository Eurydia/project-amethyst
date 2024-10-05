import { tauriPostDriver } from "$backend/database/post";
import { tauriPutDriver } from "$backend/database/put";
import { DRIVER_MODEL_TRANSFORMER } from "$core/transformers/driver";
import {
  DriverFormData,
  DriverModel,
} from "$types/models/driver";
import { FC, ReactNode, useState } from "react";
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

  let title = "ลงทะเบียนคนขับรถ";
  let initFormData: DriverFormData =
    DRIVER_MODEL_TRANSFORMER.toFormData(undefined);
  if (editing) {
    title = "แก้ไขข้อมูลคนขับรถ";
    initFormData = DRIVER_MODEL_TRANSFORMER.toFormData(
      props.driver
    );
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
      contact: fieldContact.trim() || "ไม่มี",
      license_type: fieldLicenseType,
    };

    (editing
      ? tauriPutDriver(props.driver.id, formData)
      : tauriPostDriver(formData)
    )
      .then(
        () => {
          toast.success("สำเร็จ");
          revalidate();
        },
        () => toast.error("ล้มเหลว")
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
          placeholder="ไม่มี"
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
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
