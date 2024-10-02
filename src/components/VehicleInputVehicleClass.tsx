import { KNOWN_VEHICLE_CLASSES } from "$core/constants";
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
      onChange(KNOWN_VEHICLE_CLASSES[0]);
    }
  }, [value]);

  return (
    <RadioGroup
      row
      value={value}
      onChange={(_, value) => onChange(value)}
    >
      {KNOWN_VEHICLE_CLASSES.map((vClass, index) => (
        <FormControlLabel
          key={"option" + index}
          value={vClass}
          control={<Radio />}
          label={<Typography>{vClass}</Typography>}
        />
      ))}
    </RadioGroup>
  );
};
