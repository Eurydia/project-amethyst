import { tauriPostVehicle } from "$backend/database/post";
import { tauriPutVehicle } from "$backend/database/put";
import { VEHICLE_MODEL_TRANSFORMER } from "$core/transformers/vehicle";
import {
  VehicleFormData,
  VehicleModel,
} from "$types/models/vehicle";
import {
  AddRounded,
  SaveRounded,
} from "@mui/icons-material";
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

  // TODO: translate
  let submitButtonLabel: string = "Create";
  let submitButtonStartIcon: ReactNode = <AddRounded />;
  let title: string = "Register vehicle";
  let initFormData: VehicleFormData =
    VEHICLE_MODEL_TRANSFORMER.toFormData(undefined);
  if (editing) {
    // TODO: translate
    submitButtonLabel = "Save";
    submitButtonStartIcon = <SaveRounded />;
    title = "Edit Vehicle";
    initFormData = VEHICLE_MODEL_TRANSFORMER.toFormData(
      props.vehicle
    );
  }

  const [fieldLicensePlate, setFieldLicensePlate] =
    useState(initFormData.licensePlate);
  const [fieldVendor, setFieldVendor] = useState(
    initFormData.vendor
  );
  const [fieldRegisteredCity, setFieldRegisteredCity] =
    useState(initFormData.registeredCity);
  const [fieldVehicleClass, setFieldVehicleClass] =
    useState(initFormData.vehicleClass);

  const { revalidate } = useRevalidator();

  const handleClear = () => {
    setFieldLicensePlate(initFormData.licensePlate);
    setFieldVendor(initFormData.vendor);
    setFieldRegisteredCity(initFormData.registeredCity);
    setFieldVehicleClass(initFormData.vehicleClass);
  };

  const _licensePlate = fieldLicensePlate
    .trim()
    .normalize();
  const _vendor = fieldVendor.trim().normalize();
  const _registeredCity = fieldRegisteredCity
    .trim()
    .normalize();
  const _vehicleClass = fieldVehicleClass
    .trim()
    .normalize();

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    const formData: VehicleFormData = {
      licensePlate: _licensePlate,
      vendor: _vendor,
      registeredCity: _registeredCity,
      vehicleClass: _vehicleClass,
    };

    if (editing) {
      tauriPutVehicle(props.vehicle.id, formData)
        .then(
          () => {
            toast.success("Vehicle updated"); // TODO: translate
            revalidate();
          },
          () => toast.error("Failed to update vehicle")
        )
        .finally(() => {
          handleClear();
          onClose();
        });
    } else {
      tauriPostVehicle(formData)
        // TODO: translate
        .then(
          () => {
            toast.success("Vehicle updated"); // TODO: translate
            revalidate();
          },
          () => toast.error("Failed to update vehicle")
        )
        .finally(() => {
          handleClear();
          onClose();
        });
    }
  };

  const missingFieldLicensePlate = _licensePlate.length < 1;
  const missingFieldRegisteredCity =
    _registeredCity.length < 1;
  const missingFieldVendor = _vendor.length < 1;
  const isFormIncomplete =
    missingFieldLicensePlate ||
    missingFieldRegisteredCity ||
    missingFieldVendor;

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
          errorText="Required" // TODO: translate
        />
      ),
    },
    {
      label: "หจก.",
      value: (
        <VehicleInputVendor
          error={missingFieldVendor}
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
