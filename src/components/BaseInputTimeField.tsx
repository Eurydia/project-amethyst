import { TimeField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC, ReactNode } from "react";

type BaseInputTimeFieldProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
  helperText?: ReactNode;
};
export const BaseInputTimeField: FC<
  BaseInputTimeFieldProps
> = (props) => {
  const { value, onChange, helperText } = props;
  return (
    <TimeField
      fullWidth
      formatDensity="spacious"
      format="HH:mm น."
      helperText={helperText}
      value={value}
      onChange={(next) => {
        if (next === null) {
          return;
        }
        onChange(next);
      }}
    />
  );
};
