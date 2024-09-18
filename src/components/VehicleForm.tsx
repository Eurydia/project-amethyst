import { VehicleFormData } from "$types/models/vehicle";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { VehicleClassRadioGroup } from "./VehicleClassRadioGroup";
import { VehicleCitySelect } from "./VehicleInputCitySelect";
import { VehicleInputVendorAutocomplete } from "./VehicleInputVendorAutocomplete";

type VehicleFormProps = {
  initFormData: VehicleFormData;
  open: boolean;
  onClose: () => void;
  title: string;
  slotProps: {
    submitButton: {
      label: string;
      startIcon: ReactNode;
      onClick: (formData: VehicleFormData) => void;
    };
    vendorComboBox: {
      options: string[];
    };
  };
};
export const VehicleForm: FC<VehicleFormProps> = (
  props,
) => {
  const { initFormData, slotProps, onClose, open, title } =
    props;

  const [fieldLicensePlate, setFieldLicensePlate] =
    useState(initFormData.licensePlate);
  const [fieldVendor, setFieldVendor] = useState(
    initFormData.vendor,
  );
  const [fieldRegisteredCity, setFieldRegisteredCity] =
    useState(initFormData.registeredCity);
  const [fieldVehicleClass, setFieldVehicleClass] =
    useState(initFormData.vehicleClass);

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    slotProps.submitButton.onClick({
      licensePlate: fieldLicensePlate.normalize().trim(),
      vendor: fieldVendor,
      registeredCity: fieldRegisteredCity,
      vehicleClass: fieldVehicleClass,
    });
  };

  const missingFieldLicensePlate =
    fieldLicensePlate.trim().normalize() === "";
  const missingFieldRegisteredCity =
    fieldRegisteredCity.trim().normalize() === "";
  const missingFieldVendor =
    fieldVendor.trim().normalize() === "";
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
          shouldAutoFocus
          isError={missingFieldLicensePlate}
          value={fieldLicensePlate}
          placeholder={initFormData.licensePlate}
          onChange={setFieldLicensePlate}
        />
      ),
    },
    {
      label: "ประเภทรถ",
      value: (
        <VehicleClassRadioGroup
          value={fieldVehicleClass}
          onChange={setFieldVehicleClass}
        />
      ),
    },
    {
      label: "จังหวัดที่จดทะเบียน",
      value: (
        <VehicleCitySelect
          value={fieldRegisteredCity}
          onChange={setFieldRegisteredCity}
        />
      ),
    },
    {
      label: "หจก.",
      value: (
        <VehicleInputVendorAutocomplete
          options={slotProps.vendorComboBox.options}
          placeholder={initFormData.vendor}
          value={fieldVendor}
          onChange={setFieldVendor}
        />
      ),
    },
  ];

  return (
    <BaseForm
      open={open}
      onClose={onClose}
      title={title}
      slotProps={{
        submitButton: {
          disabled: isFormIncomplete,
          startIcon: slotProps.submitButton.startIcon,
          label: slotProps.submitButton.label,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
