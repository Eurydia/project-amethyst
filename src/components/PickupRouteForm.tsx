import { PickupRouteFormData } from "$types/models/pickup-route";
import { WarningRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";

type PickupRouteFormProps = {
  initFormData: PickupRouteFormData;
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  slotProps: {
    submitButton: {
      onClick: (formData: PickupRouteFormData) => void;
      label: string;
      startIcon: ReactNode;
    };
  };
};
export const PickupRouteForm: FC<PickupRouteFormProps> = (
  props,
) => {
  const { initFormData, title, slotProps, open, onClose } =
    props;

  const [fieldName, setFieldName] = useState(
    initFormData.name,
  );
  const [fieldArrivalTime, setFieldArrivalTime] = useState(
    dayjs(initFormData.arrivalTime, "HH:mm"),
  );
  const [fieldDepartureTime, setFieldDepartureTime] =
    useState(dayjs(initFormData.departureTime, "HH:mm"));

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }

    slotProps.submitButton.onClick({
      name: fieldName.trim().normalize(),
      arrivalTime: fieldArrivalTime.format("HH:mm"),
      departureTime: fieldDepartureTime.format("HH:mm"),
    });
  };

  const isArrivalTimeIncomplete =
    Number.isNaN(fieldArrivalTime.hour()) ||
    Number.isNaN(fieldArrivalTime.minute());
  const isDepartureTimeIncomplete =
    Number.isNaN(fieldDepartureTime.hour()) ||
    Number.isNaN(fieldDepartureTime.minute());
  const isMissingName = fieldName.trim().normalize() === "";
  const isFormIncomplete =
    isMissingName ||
    isArrivalTimeIncomplete ||
    isDepartureTimeIncomplete;

  const formItems: {
    label: string;
    value: ReactNode;
  }[] = [
    {
      label: "ชื่อสาย",
      value: (
        <BaseInputTextField
          autoFocus
          multiline
          helperText={
            isMissingName && (
              <Typography>
                <WarningRounded />
                กรุณากรอกชื่อสาย
              </Typography>
            )
          }
          error={isMissingName}
          value={fieldName}
          placeholder={initFormData.name}
          onChange={setFieldName}
        />
      ),
    },
    {
      label: "เวลารับเข้า",
      value: (
        <BaseInputTimeField
          value={fieldArrivalTime}
          onChange={setFieldArrivalTime}
          helperText={
            // TODO: translate
            isArrivalTimeIncomplete && (
              <Typography>
                <WarningRounded />
                The arrival time should follow HH:mm format
              </Typography>
            )
          }
        />
      ),
    },
    {
      label: "เวลารับออก",
      value: (
        <BaseInputTimeField
          value={fieldDepartureTime}
          onChange={setFieldDepartureTime}
          helperText={
            // TODO: translate
            isDepartureTimeIncomplete && (
              <Typography>
                <WarningRounded />
                The departure time should follow HH:mm
                format
              </Typography>
            )
          }
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
          children: slotProps.submitButton.label,
          startIcon: slotProps.submitButton.startIcon,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
