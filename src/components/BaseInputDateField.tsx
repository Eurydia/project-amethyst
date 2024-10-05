import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC } from "react";

type BaseInputDateFieldProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
  error?: boolean;
};
export const BaseInputDateField: FC<
  BaseInputDateFieldProps
> = (props) => {
  const { value, onChange, error } = props;
  return (
    <DateField
      fullWidth
      formatDensity="spacious"
      format="DD/MM/YYYY"
      helperText={error && "วันที่ไม่ถูกต้อง"}
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
