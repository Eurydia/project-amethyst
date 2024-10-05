import { tauriPostDriver } from "$backend/database/post";
import { tauriPutDriver } from "$backend/database/put";
import { DRIVER_MODEL_TRANSFORMER } from "$core/transformers/driver";
import {
  DriverFormData,
  DriverModel,
} from "$types/models/driver";
import {
  AddRounded,
  SaveRounded,
} from "@mui/icons-material";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { DriverInputLicenseType } from "./DriverInputLicenseType";

type DriverFormPostProps = {
  editing?: false | undefined;
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
  let submitButtonLabel = "เพิ่ม";
  let submitButtonStartIcon = <AddRounded />;
  if (editing) {
    title = "แก้ไขข้อมูลคนขับรถ";
    submitButtonLabel = "บันทึก";
    submitButtonStartIcon = <SaveRounded />;
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
    const contact = fieldContact.trim().normalize();
    const formData: DriverFormData = {
      name: fieldName.trim().normalize(),
      surname: fieldSurname.trim().normalize(),
      contact: contact.trim().normalize(),
      license_type: fieldLicenseType,
    };

    let action = tauriPostDriver(formData).then(
      () => {
        toast.success("เพิ่มสำเร็จ");
        revalidate();
      },
      () => toast.error("เพิ่มล้มเหลว")
    );
    if (editing) {
      action = tauriPutDriver(
        props.driver.id,
        formData
      ).then(
        () => {
          toast.success("บันทึกสำเร็จ");
          revalidate();
        },
        () => toast.error("บันทึกล้มเหลว")
      );
    }
    await action.finally(() => {
      resetForm();
      onClose();
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
          errorText="ต้องกรองชื่อคนขับรถ"
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
          errorText="ต้องกรองนามสกุลคนขชับรถ"
        />
      ),
    },
    {
      label: "เบอร์ติดต่อ",
      value: (
        <BaseInputTextField
          placeholder={initFormData.contact}
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
