import { WarningRounded } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC } from "react";

type BaseInputTimeFieldProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
  error?: boolean;
};
export const BaseInputTimeField: FC<
  BaseInputTimeFieldProps
> = (props) => {
  const { value, onChange, error } = props;
  return (
    <TimeField
      fullWidth
      formatDensity="spacious"
      format="HH:mm น."
      value={value}
      slotProps={{
        input: {
          startAdornment: error && (
            <InputAdornment position="start">
              <WarningRounded />
            </InputAdornment>
          ),
        },
      }}
      onChange={(next) => {
        if (next === null) {
          return;
        }
        onChange(next);
      }}
    />
  );
};
