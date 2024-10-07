import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC } from "react";

type BaseInputDateFieldProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
};
export const BaseInputDateField: FC<
  BaseInputDateFieldProps
> = (props) => {
  const { value, onChange } = props;
  return (
    <DateField
      fullWidth
      formatDensity="spacious"
      format="DD/MM/YYYY"
      value={value}
      onChange={(v) => {
        if (v === null) {
          return;
        }
        onChange(v);
      }}
    />
  );
};
