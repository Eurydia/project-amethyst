import { WarningRounded } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
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
      slotProps={{
        input: {
          startAdornment: error && (
            <InputAdornment position="start">
              <WarningRounded />
            </InputAdornment>
          ),
        },
      }}
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
