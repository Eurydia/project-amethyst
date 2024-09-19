import { postOperationalLog } from "$backend/database/post";
import { DriverModel } from "$types/models/driver";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import { AddRounded } from "@mui/icons-material";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseForm } from "./BaseForm";
import { DriverInputDriverSelect } from "./DriverInputDriverSelect";
import { PickupRouteInputPickupRouteSelect } from "./PickupRouteInputPickupRouteSelect";
import { VehicleInputSelect } from "./VehicleInputSelect";

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
    dayjs(dayjs().startOf("month").format()),
  );
  const [fieldEndDate, setFieldEndDate] = useState(
    dayjs(dayjs().endOf("month").format()),
  );
  const [fieldDriver, setFieldDriver] = useState(
    slotProps.driverSelect.options[0],
  );
  const [fieldRoute, setFieldRoute] = useState(
    slotProps.routeSelect.options[0],
  );
  const [fieldVehicle, setFieldVehicle] = useState(
    slotProps.vehicleSelect.options[0],
  );

  const handleSubmit = () => {
    if (isFormIncomplete) {
      return;
    }
    postOperationalLog({
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
        () => toast.error("ไม่สำเร็จ"),
      )
      .finally(onClose);
  };

  const isFieldStartDateInvalidValid =
    fieldStartDate === null ||
    Number.isNaN(fieldStartDate.date()) ||
    Number.isNaN(fieldStartDate.month()) ||
    Number.isNaN(fieldStartDate.year());
  const isFieldEndDateInvalidValid =
    fieldEndDate === null ||
    Number.isNaN(fieldEndDate.date()) ||
    Number.isNaN(fieldEndDate.month()) ||
    Number.isNaN(fieldEndDate.year());
  const isDriverMissing = fieldDriver === null;
  const isRouteMissing = fieldRoute === null;
  const isVehicleMissing = fieldVehicle === null;
  const isFormIncomplete =
    isDriverMissing ||
    isRouteMissing ||
    isVehicleMissing ||
    isFieldStartDateInvalidValid ||
    isFieldEndDateInvalidValid ||
    fieldEndDate.isBefore(fieldStartDate);

  const formItems: {
    label: string;
    value: ReactNode;
  }[] = [
    {
      label: "วันที่เริ่มมีผล",
      value: (
        <DateField
          fullWidth
          format="DD/MM/YYYY"
          formatDensity="spacious"
          value={fieldStartDate}
          onChange={(value) => {
            if (value === null) {
              return;
            }
            setFieldStartDate(value);
          }}
        />
      ),
    },
    {
      label: "วันที่สิ้นสุด",
      value: (
        <DateField
          fullWidth
          format="DD/MM/YYYY"
          formatDensity="spacious"
          value={fieldEndDate}
          onChange={(value) => {
            if (value === null) {
              return;
            }
            setFieldEndDate(value);
          }}
        />
      ),
    },
    {
      label: "คนขับรถ",
      value: (
        <DriverInputDriverSelect
          disabled={slotProps.driverSelect.disabled}
          options={slotProps.driverSelect.options}
          value={fieldDriver}
          onChange={setFieldDriver}
        />
      ),
    },
    {
      label: "รถรับส่ง",
      value: (
        <VehicleInputSelect
          disabled={slotProps.vehicleSelect.disabled}
          options={slotProps.vehicleSelect.options}
          value={fieldVehicle}
          onChange={setFieldVehicle}
        />
      ),
    },
    {
      label: "สายรถ",
      value: (
        <PickupRouteInputPickupRouteSelect
          isDisabled={slotProps.routeSelect.disabled}
          options={slotProps.routeSelect.options}
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
          label: "ลงบันทึก",
          startIcon: <AddRounded />,
          disabled: isFormIncomplete,
          onClick: handleSubmit,
        },
        cancelButton: {
          onClick: onClose,
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
