import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC, ReactNode } from "react";

type BaseInputDateFieldProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
  error?: boolean;
  helperText?: ReactNode;
};
export const BaseInputDateField: FC<
  BaseInputDateFieldProps
> = (props) => {
  const { value, onChange, helperText } = props;
  return (
    <DateField
      fullWidth
      formatDensity="spacious"
      format="DD/MM/YYYY"
      helperText={helperText}
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
