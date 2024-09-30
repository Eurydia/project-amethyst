/** @format */

import { tauriPostOperationalLog } from "$backend/database/post";
import { DriverModel } from "$types/models/driver";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import {
  AddRounded,
  WarningRounded,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, Fragment, ReactNode, useState } from "react";
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

  const [fieldStartDate, setFieldStartDate] = useState(
    dayjs(dayjs().startOf("month").format())
  );
  const [fieldEndDate, setFieldEndDate] = useState(
    dayjs(dayjs().endOf("month").format())
  );
  const [fieldDriver, setFieldDriver] = useState(
    slotProps.driverSelect.options[0]
  );
  const [fieldRoute, setFieldRoute] = useState(
    slotProps.routeSelect.options[0]
  );
  const [fieldVehicle, setFieldVehicle] = useState(
    slotProps.vehicleSelect.options[0]
  );

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    tauriPostOperationalLog({
      driver: fieldDriver,
      route: fieldRoute,
      vehicle: fieldVehicle,
      startDate: fieldStartDate.startOf("day").format(),
      endDate: fieldEndDate.endOf("day").format(),
    })
      .then(
        () => {
          toast.success("สำเร็จ");
          revalidate();
        },
        () => toast.error("ไม่สำเร็จ")
      )
      .finally(onClose);
  };

  const isStartDateInvalid =
    fieldStartDate === null ||
    Number.isNaN(fieldStartDate.date()) ||
    Number.isNaN(fieldStartDate.month()) ||
    Number.isNaN(fieldStartDate.year());
  const isEndDateInvalid =
    fieldEndDate === null ||
    Number.isNaN(fieldEndDate.date()) ||
    Number.isNaN(fieldEndDate.month()) ||
    Number.isNaN(fieldEndDate.year());
  const isEndDateBeforeStartDate =
    fieldEndDate.isBefore(fieldStartDate);
  const isDriverMissing = fieldDriver === null;
  const isRouteMissing = fieldRoute === null;
  const isVehicleMissing = fieldVehicle === null;
  const isFormIncomplete =
    isDriverMissing ||
    isRouteMissing ||
    isVehicleMissing ||
    isStartDateInvalid ||
    isEndDateInvalid ||
    isEndDateBeforeStartDate;

  const formItems: {
    label: string;
    value: ReactNode;
  }[] = [
    {
      label: "วันที่เริ่มมีผล",
      value: (
        <BaseInputDateField
          value={fieldStartDate}
          onChange={setFieldStartDate}
          helperText={
            // TODO: translate
            <Fragment>
              {isStartDateInvalid && (
                <Typography>
                  <WarningRounded />
                  Invalid start date
                </Typography>
              )}
              {isEndDateBeforeStartDate && (
                <Typography>
                  <WarningRounded />
                  End date is before start date
                </Typography>
              )}
            </Fragment>
          }
        />
      ),
    },
    {
      label: "วันที่สิ้นสุด",
      value: (
        <BaseInputDateField
          value={fieldEndDate}
          onChange={setFieldEndDate}
          helperText={
            // TODO: translate
            <Fragment>
              {isEndDateInvalid && (
                <Typography>
                  <WarningRounded />
                  Invalid end date
                </Typography>
              )}
              {isEndDateBeforeStartDate && (
                <Typography>
                  <WarningRounded />
                  End date is before start date
                </Typography>
              )}
            </Fragment>
          }
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
          children: "ลงบันทึก",
          startIcon: <AddRounded />,
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
