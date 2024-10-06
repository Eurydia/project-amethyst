import { tauriPostPickupRoute } from "$backend/database/post";
import { tauriPutPickupRoute } from "$backend/database/put";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route";
import {
  PickupRouteFormData,
  PickupRouteModel,
} from "$types/models/pickup-route";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
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

  const title = editing ? "แก้ไขข้อมูลสายรถ" : "เพิ่มสายรถ";
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

  const clearForm = () => {
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
      name: fieldName.trim().normalize(),
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
        clearForm();
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
          minRows={2}
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
          error={isArrivalTimeValid}
        />
      ),
    },
    {
      label: "เวลารับออก",
      value: (
        <BaseInputTimeField
          value={fieldDepartureTime}
          onChange={setFieldDepartureTime}
          error={isDepartureTimeValid}
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
        },
      }}
    >
      {formItems}
    </BaseForm>
  );
};
