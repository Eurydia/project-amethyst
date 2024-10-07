import { tauriPostVehicle } from "$backend/database/post";
import { tauriPutVehicle } from "$backend/database/put";
import { VEHICLE_MODEL_TRANSFORMER } from "$core/transformers/vehicle";
import {
  VehicleFormData,
  VehicleModel,
} from "$types/models/vehicle";
import { Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
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

  const title = editing ? (
    <Fragment>
      <Typography variant="h2">
        {props.vehicle.license_plate}
      </Typography>
      <Typography variant="h3">
        แก้ไขข้อมูลรถรับส่ง
      </Typography>
    </Fragment>
  ) : (
    <Typography variant="h2">เพิ่มรถรับส่ง</Typography>
  );
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
      license_plate: fieldLicensePlate.trim(),
      vendor: fieldVendor.trim(),
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
        (err) => {
          toast.error(
            editing ? "แก้ไขล้มเหลว" : "เพิ่มล้มเหลว"
          );
          console.error(err);
        }
      )
      .finally(() => {
        handleReset();
        onClose();
      });
  };

  const missingLicensePlate =
    fieldLicensePlate.trim().normalize().length < 1;
  const missingVendor =
    fieldVendor.trim().normalize().length < 1;
  const isFormIncomplete =
    missingLicensePlate || missingVendor;

  const formItems = [
    {
      label: "เลขทะเบียน",
      value: (
        <BaseInputTextField
          autoFocus
          error={missingLicensePlate}
          value={fieldLicensePlate}
          onChange={setFieldLicensePlate}
        />
      ),
    },
    {
      label: "หจก.",
      value: (
        <VehicleInputVendor
          {...slotProps.vendorComboBox}
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

  const disabledReasons: string[] = [];
  if (missingLicensePlate) {
    disabledReasons.push("ต้องมีเลขทะเบียน");
  }
  if (missingVendor) {
    disabledReasons.push("ต้องมีหจก.");
  }

  return (
    <BaseForm
      open={open}
      title={title}
      onClose={onClose}
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
