/** @format */

import { usePostPickupRoute } from "$hooks/usePostPickupRoute";
import { usePutPickupRoute } from "$hooks/usePutPickupRoute";
import { PickupRouteFormData } from "$types/models/pickup-route";
import { AddRounded, SaveRounded, WarningRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";

type PickupRouteFormProps =
  | {
      editing: true;
      open: boolean;
      onClose: () => void;
      routeId: number;
      initFormData: PickupRouteFormData;
    }
  | {
      editing?: false | undefined;
      open: boolean;
      onClose: () => void;
    };
export const PickupRouteForm: FC<PickupRouteFormProps> = (props) => {
  const { onClose, open, editing } = props;

  let initFormData: PickupRouteFormData;
  let title = "";
  let submitButtonStartIcon: ReactNode;
  let submitButtonLabel = "";
  if (editing) {
    title = "Edit Pickup Route details"; // TODO: translate
    submitButtonLabel = "Save"; // TODO: translate
    submitButtonStartIcon = <SaveRounded />;
    initFormData = props.initFormData;
  } else {
    title = "Register pickup route"; // TODO: translate
    submitButtonLabel = "Add"; // TODO: translate
    submitButtonStartIcon = <AddRounded />;
    initFormData = {
      name: "",
      arrivalTime: dayjs().startOf("day").format("HH:mm"),
      departureTime: dayjs().endOf("day").format("HH:mm"),
    };
  }
  const [fieldName, setFieldName] = useState(initFormData.name);
  const [fieldArrivalTime, setFieldArrivalTime] = useState(
    dayjs(initFormData.arrivalTime, "HH:mm")
  );
  const [fieldDepartureTime, setFieldDepartureTime] = useState(
    dayjs(initFormData.departureTime, "HH:mm")
  );
  const { revalidate } = useRevalidator();
  const putRoute = usePutPickupRoute();
  const postRoute = usePostPickupRoute();

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    const formData: PickupRouteFormData = {
      name: fieldName.trim().normalize(),
      arrivalTime: fieldArrivalTime.format("HH:mm"),
      departureTime: fieldDepartureTime.format("HH:mm"),
    };

    if (editing) {
      putRoute(props.routeId, formData).finally(revalidate);
    } else {
      postRoute(formData).finally(revalidate);
    }
  };

  const isArrivalTimeIncomplete =
    Number.isNaN(fieldArrivalTime.hour()) ||
    Number.isNaN(fieldArrivalTime.minute());
  const isDepartureTimeIncomplete =
    Number.isNaN(fieldDepartureTime.hour()) ||
    Number.isNaN(fieldDepartureTime.minute());
  const isMissingName = fieldName.trim().normalize() === "";
  const isFormIncomplete =
    isMissingName || isArrivalTimeIncomplete || isDepartureTimeIncomplete;

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
                Route must have a name
                {/* TODO: translate */}
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
            isArrivalTimeIncomplete && (
              <Typography>
                <WarningRounded />
                The arrival time should follow HH:mm format
                {/* TODO: Translate */}
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
            isDepartureTimeIncomplete && (
              <Typography>
                <WarningRounded />
                The departure time should follow HH:mm format
                {/* TODO: Translate */}
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
          children: submitButtonLabel,
          startIcon: submitButtonStartIcon,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
