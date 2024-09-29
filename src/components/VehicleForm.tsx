import { VehicleFormData } from "$types/models/vehicle";
import { WarningRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { VehicleClassRadioGroup } from "./VehicleClassRadioGroup";
import { VehicleCitySelect } from "./VehicleInputCitySelect";
import { VehicleInputVendorAutocomplete } from "./VehicleInputVendorAutocomplete";

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
  vehicleId: number;
  initFormData: VehicleFormData;
  open: boolean;
  onClose: () => void;
  slotProps: {
    vendorComboBox: {
      options: string[];
    };
  };
};

type VehicleFormProps<Mode extends boolean | undefined> =
  Mode extends true
    ? VehiclePutFormProps
    : VehiclePostFormProps;
export const VehicleForm: FC<VehicleFormProps> = (
  props
) => {
  const { slotProps, onClose, open } = props;

  const [fieldLicensePlate, setFieldLicensePlate] =
    useState(initFormData.licensePlate);
  const [fieldVendor, setFieldVendor] = useState(
    initFormData.vendor
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
          autoFocus
          error={missingFieldLicensePlate}
          value={fieldLicensePlate}
          placeholder={initFormData.licensePlate}
          onChange={setFieldLicensePlate}
          helperText={
            // TODO: translate
            missingFieldLicensePlate && (
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
      label: "หจก.",
      value: (
        <VehicleInputVendorAutocomplete
          error={missingFieldVendor}
          helperText={
            missingFieldVendor && (
              <Typography>
                <WarningRounded />
                Required
              </Typography>
            )
          }
          options={slotProps.vendorComboBox.options}
          placeholder={initFormData.vendor}
          value={fieldVendor}
          onChange={setFieldVendor}
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
          children: slotProps.submitButton.label,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
