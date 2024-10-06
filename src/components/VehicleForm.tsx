import { tauriPostVehicle } from "$backend/database/post";
import { tauriPutVehicle } from "$backend/database/put";
import { VEHICLE_MODEL_TRANSFORMER } from "$core/transformers/vehicle";
import {
  VehicleFormData,
  VehicleModel,
} from "$types/models/vehicle";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { VehicleInputRegisteredCity } from "./VehicleInputRegisteredCity";
import { VehicleInputVehicleClass } from "./VehicleInputVehicleClass";
import { VehicleInputVendor } from "./VehicleInputVendor";

type VehiclePostFormProps = {
  editing: false;
  open: boolean;
  onClose: () => void;
  slotProps: {
    vendorComboBox: {
      options: string[];
    };
  };
};

type VehiclePutFormProps = {
  editing: true;
  vehicle: VehicleModel;
  open: boolean;
  onClose: () => void;
  slotProps: {
    vendorComboBox: {
      options: string[];
    };
  };
};
type VehicleFormProps =
  | VehiclePostFormProps
  | VehiclePutFormProps;
export const VehicleForm: FC<VehicleFormProps> = (
  props
) => {
  const { editing, slotProps, onClose, open } = props;

  const title = editing
    ? "แก้ไขข้อมูลรถรับส่ง"
    : "เพิ่มรถรับส่ง";
  const initFormData = VEHICLE_MODEL_TRANSFORMER.toFormData(
    editing ? props.vehicle : undefined,
    slotProps.vendorComboBox.options[0]
  );

  const [fieldLicensePlate, setFieldLicensePlate] =
    useState(initFormData.license_plate);
  const [fieldVendor, setFieldVendor] = useState(
    initFormData.vendor
  );
  const [fieldRegisteredCity, setFieldRegisteredCity] =
    useState(initFormData.registered_city);
  const [fieldVehicleClass, setFieldVehicleClass] =
    useState(initFormData.vehicle_class);

  const { revalidate } = useRevalidator();

  const handleReset = () => {
    setFieldLicensePlate(initFormData.license_plate);
    setFieldVendor(initFormData.vendor);
    setFieldRegisteredCity(initFormData.registered_city);
    setFieldVehicleClass(initFormData.vehicle_class);
  };

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    const formData: VehicleFormData = {
      license_plate: fieldLicensePlate.trim().normalize(),
      vendor: fieldVendor.trim().normalize(),
      vehicle_class: fieldVehicleClass,
      registered_city: fieldRegisteredCity,
    };
    (editing
      ? tauriPutVehicle(props.vehicle.id, formData)
      : tauriPostVehicle(formData)
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

  const missingFieldLicensePlate =
    fieldLicensePlate.trim().normalize().length < 1;
  const missingFieldVendor =
    fieldVendor.trim().normalize().length < 1;
  const isFormIncomplete =
    missingFieldLicensePlate || missingFieldVendor;

  const formItems: {
    label: string;
    value: ReactNode;
  }[] = [
    {
      label: "เลขทะเบียน",
      value: (
        <BaseInputTextField
          autoFocus
          error={missingFieldLicensePlate}
          value={fieldLicensePlate}
          onChange={setFieldLicensePlate}
        />
      ),
    },
    {
      label: "หจก.",
      value: (
        <VehicleInputVendor
          options={slotProps.vendorComboBox.options}
          value={fieldVendor}
          onChange={setFieldVendor}
        />
      ),
    },
    {
      label: "ประเภทรถ",
      value: (
        <VehicleInputVehicleClass
          value={fieldVehicleClass}
          onChange={setFieldVehicleClass}
        />
      ),
    },
    {
      label: "จังหวัดที่จดทะเบียน",
      value: (
        <VehicleInputRegisteredCity
          value={fieldRegisteredCity}
          onChange={setFieldRegisteredCity}
        />
      ),
    },
  ];

  return (
    <BaseForm
      open={open}
      title={title}
      onClose={onClose}
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
