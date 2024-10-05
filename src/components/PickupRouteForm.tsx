import { tauriPostPickupRoute } from "$backend/database/post";
import { tauriPutPickupRoute } from "$backend/database/put";
import { PickupRouteFormData } from "$types/models/pickup-route";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseInputTimeField } from "./BaseInputTimeField";

type PickupRouteFormProps =
  | {
      editing: true;
      open: boolean;
      onClose: () => void;
      initFormData: PickupRouteFormData;
      routeId: number;
    }
  | {
      editing?: false | undefined;
      open: boolean;
      onClose: () => void;
    };

export const PickupRouteForm: FC<PickupRouteFormProps> = (
  props
) => {
  const { onClose, open, editing } = props;

  let initFormData: PickupRouteFormData;
  let title: string;
  if (editing) {
    title = "Edit Pickup Route details"; // TODO: translate
    initFormData = props.initFormData;
  } else {
    title = "Register pickup route"; // TODO: translate
    initFormData = {
      name: "",
      arrival_time: dayjs().startOf("day").format("HH:mm"),
      departure_time: dayjs().endOf("day").format("HH:mm"),
    };
  }
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

    if (editing) {
      tauriPutPickupRoute(props.routeId, formData)
        .then(
          () => {
            toast.success("Route updated successfully");
            revalidate();
          }, // TODO: translate
          () => toast.error("Failed to update route") // TODO: translate
        )
        .finally(() => {
          clearForm();
          onClose();
        });
    } else {
      tauriPostPickupRoute(formData).finally(() => {
        clearForm();
        onClose();
      });
    }
  };

  const isArrivalTimeIncomplete =
    Number.isNaN(fieldArrivalTime.hour()) ||
    Number.isNaN(fieldArrivalTime.minute());
  const isDepartureTimeInvalid =
    Number.isNaN(fieldDepartureTime.hour()) ||
    Number.isNaN(fieldDepartureTime.minute());
  const isMissingName = fieldName.trim().normalize() === "";
  const isFormIncomplete =
    isMissingName ||
    isArrivalTimeIncomplete ||
    isDepartureTimeInvalid;

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
          error={isArrivalTimeIncomplete}
        />
      ),
    },
    {
      label: "เวลารับออก",
      value: (
        <BaseInputTimeField
          value={fieldDepartureTime}
          onChange={setFieldDepartureTime}
          error={isDepartureTimeInvalid}
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
