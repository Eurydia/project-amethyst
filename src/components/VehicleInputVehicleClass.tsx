import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";

type VehicleInputVehicleClassProps = {
  value: string;
  onChange: (value: string) => void;
};
export const VehicleInputVehicleClass: FC<
  VehicleInputVehicleClassProps
> = (props) => {
  const { value, onChange } = props;

  useEffect(() => {
    if (value.trim().normalize().length < 1) {
      onChange("รถตู้");
    }
  }, [value]);

  return (
    <RadioGroup
      row
      value={value}
      onChange={(_, value) => onChange(value)}
    >
      <FormControlLabel
        value="รถตู้"
        control={<Radio />}
        label={<Typography>รถตู้</Typography>}
      />
      <FormControlLabel
        value="รถบัส"
        control={<Radio />}
        label={<Typography>รถบัส</Typography>}
      />
    </RadioGroup>
  );
};
