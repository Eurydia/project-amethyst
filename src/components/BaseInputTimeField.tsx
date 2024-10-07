import { TimeField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC } from "react";

type BaseInputTimeFieldProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
};
export const BaseInputTimeField: FC<
  BaseInputTimeFieldProps
> = (props) => {
  const { value, onChange } = props;
  return (
    <TimeField
      fullWidth
      formatDensity="spacious"
      format="HH:mm น."
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
