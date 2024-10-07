import { tauriPostPickupRoute } from "$backend/database/post";
import { tauriPutPickupRoute } from "$backend/database/put";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route";
import {
  PickupRouteFormData,
  PickupRouteModel,
} from "$types/models/pickup-route";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";

type PickupRoutePostFormProps = {
  editing: false;
  open: boolean;
  onClose: () => void;
};

type PickupRoutePutFormProps = {
  route: PickupRouteModel;
  editing: true;
  open: boolean;
  onClose: () => void;
};

type PickupRouteFormProps =
  | PickupRoutePostFormProps
  | PickupRoutePutFormProps;

export const PickupRouteForm: FC<PickupRouteFormProps> = (
  props
) => {
  const { onClose, open, editing } = props;

  const title = editing ? (
    <Stack spacing={1}>
      <Typography variant="h2">
        {props.route.name}
      </Typography>
      <Typography variant="h3">แก้ไขข้อมูลสายรถ</Typography>
    </Stack>
  ) : (
    <Typography variant="h2">เพิ่มสายรถ</Typography>
  );
  const initFormData =
    PICKUP_ROUTE_MODEL_TRANSFORMER.toFormData(
      editing ? props.route : undefined
    );

  const [fieldName, setFieldName] = useState(
    initFormData.name
  );
  const [fieldArrivalTime, setFieldArrivalTime] = useState(
    dayjs(initFormData.arrival_time, "HH:mm")
  );
  const [fieldDepartureTime, setFieldDepartureTime] =
    useState(dayjs(initFormData.departure_time, "HH:mm"));

  const { revalidate } = useRevalidator();

  const handleReset = () => {
    setFieldName(initFormData.name);
    setFieldArrivalTime(
      dayjs(initFormData.arrival_time, "HH:mm")
    );
    setFieldDepartureTime(
      dayjs(initFormData.departure_time, "HH:mm")
    );
  };

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    const formData: PickupRouteFormData = {
      name: fieldName.trim(),
      arrival_time: fieldArrivalTime.format("HH:mm"),
      departure_time: fieldDepartureTime.format("HH:mm"),
    };
    (editing
      ? tauriPutPickupRoute(props.route.id, formData)
      : tauriPostPickupRoute(formData)
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

  const isArrivalTimeValid = fieldArrivalTime.isValid();
  const isDepartureTimeValid = fieldDepartureTime.isValid();
  const isMissingName =
    fieldName.trim().normalize().length === 0;
  const isFormIncomplete =
    isMissingName ||
    !isArrivalTimeValid ||
    !isDepartureTimeValid;

  const disabledReasons: string[] = [];
  if (isMissingName) {
    disabledReasons.push("สายรถต้องมีชื่อ");
  }
  if (!isArrivalTimeValid) {
    disabledReasons.push("เวลารับเข้าไม่ถูกต้อง");
  }
  if (!isDepartureTimeValid) {
    disabledReasons.push("เวลารับออกไม่ถูกต้อง");
  }
  const formItems = [
    {
      label: "ชื่อสาย",
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
      label: "เวลารับเข้า",
      value: (
        <BaseInputTimeField
          value={fieldArrivalTime}
          onChange={setFieldArrivalTime}
        />
      ),
    },
    {
      label: "เวลารับออก",
      value: (
        <BaseInputTimeField
          value={fieldDepartureTime}
          onChange={setFieldDepartureTime}
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
          onClick: handleSubmit,
          disabledReasons,
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
