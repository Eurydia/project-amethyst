import { tauriPostOperationalLog } from "$backend/database/post";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log";
import { DriverModel } from "$types/models/driver";
import { OperationalLogFormData } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { BaseInputDateField } from "./BaseInputDateField";
import { DriverInputDriverSelect } from "./DriverInputDriverSelect";
import { PickupRouteInputPickupRouteSelect } from "./PickupRouteInputPickupRouteSelect";
import { VehicleInputVehicle } from "./VehicleInputVehicle";

type OperationalLogFormProps = {
  open: boolean;
  onClose: () => void;
  slotProps: {
    routeSelect: {
      disabled?: boolean;
      options: PickupRouteModel[];
    };
    driverSelect: {
      disabled?: boolean;
      options: DriverModel[];
    };
    vehicleSelect: {
      disabled?: boolean;
      options: VehicleModel[];
    };
  };
};
export const OperationalLogForm: FC<
  OperationalLogFormProps
> = (props) => {
  const { slotProps, onClose, open } = props;
  const { revalidate } = useRevalidator();

  const initFormData =
    OPERATIONAL_LOG_MODEL_TRANSFORMER.toFormData(
      slotProps.driverSelect.options[0],
      slotProps.vehicleSelect.options[0],
      slotProps.routeSelect.options[0]
    );

  const [fieldStartDate, setFieldStartDate] = useState(
    dayjs(initFormData.start_date)
  );
  const [fieldEndDate, setFieldEndDate] = useState(
    dayjs(initFormData.end_date)
  );
  const [fieldDriver, setFieldDriver] = useState(
    initFormData.driver
  );
  const [fieldRoute, setFieldRoute] = useState(
    initFormData.route
  );
  const [fieldVehicle, setFieldVehicle] = useState(
    initFormData.vehicle
  );

  const handleReset = () => {
    setFieldStartDate(dayjs(initFormData.start_date));
    setFieldEndDate(dayjs(initFormData.end_date));
    setFieldDriver(initFormData.driver);
    setFieldRoute(initFormData.route);
    setFieldVehicle(initFormData.vehicle);
  };

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    const formData: OperationalLogFormData = {
      driver: fieldDriver,
      route: fieldRoute,
      vehicle: fieldVehicle,
      start_date: fieldStartDate.startOf("day").format(),
      end_date: fieldEndDate.endOf("day").format(),
    };
    tauriPostOperationalLog(formData)
      .then(
        () => {
          toast.success("เพิ่มสำเร็จ");
          revalidate();
        },
        () => toast.error("เพิ่มล้มเหลว")
      )
      .finally(() => {
        handleReset();
        onClose();
      });
  };

  const isStartDateValid = fieldStartDate.isValid();
  const isEndDateValid = fieldEndDate.isValid();
  const isStartDateAfterEndDate =
    fieldStartDate.isAfter(fieldEndDate);
  const isFormIncomplete =
    !isStartDateValid ||
    !isEndDateValid ||
    isStartDateAfterEndDate;

  const disabledReasons: string[] = [];
  if (!isStartDateValid) {
    disabledReasons.push("วันที่เริ่มมีผลไม่ถูกต้อง");
  }
  if (!isEndDateValid) {
    disabledReasons.push("วันที่สิ้นสุดไม่ถูกต้อง");
  }
  if (isStartDateAfterEndDate) {
    disabledReasons.push(
      "วันที่เริ่มมีผลอยู่หลังจากวันที่หมดอายุ"
    );
  }

  const formItems = [
    {
      label: "วันที่เริ่มมีผล",
      value: (
        <BaseInputDateField
          value={fieldStartDate}
          onChange={setFieldStartDate}
        />
      ),
    },
    {
      label: "วันที่หมดอายุ",
      value: (
        <BaseInputDateField
          value={fieldEndDate}
          onChange={setFieldEndDate}
        />
      ),
    },
    {
      label: "คนขับรถ",
      value: (
        <DriverInputDriverSelect
          {...slotProps.driverSelect}
          onChange={setFieldDriver}
          value={fieldDriver}
        />
      ),
    },
    {
      label: "รถรับส่ง",
      value: (
        <VehicleInputVehicle
          {...slotProps.vehicleSelect}
          value={fieldVehicle}
          onChange={setFieldVehicle}
        />
      ),
    },
    {
      label: "สายรถ",
      value: (
        <PickupRouteInputPickupRouteSelect
          {...slotProps.routeSelect}
          value={fieldRoute}
          onChange={setFieldRoute}
        />
      ),
    },
  ];

  return (
    <BaseForm
      slotProps={{
        submitButton: {
          disabledReasons,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
      }}
      open={open}
      onClose={onClose}
      title="เพิ่มประวัติการเดินรถ"
    >
      {formItems}
    </BaseForm>
  );
};
