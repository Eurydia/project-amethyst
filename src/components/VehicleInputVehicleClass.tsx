import { KNOWN_VEHICLE_CLASSES } from "$core/constants";
import { VehicleModel } from "$types/models/vehicle";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";

type VehicleInputVehicleClassProps = {
  value: VehicleModel["vehicle_class"];
  onChange: (value: VehicleModel["vehicle_class"]) => void;
};
export const VehicleInputVehicleClass: FC<
  VehicleInputVehicleClassProps
> = (props) => {
  const { value, onChange } = props;

  return (
    <RadioGroup
      row
      value={value}
      onChange={(_, value) =>
        onChange(value as VehicleModel["vehicle_class"])
      }
    >
      {KNOWN_VEHICLE_CLASSES.map((optionValue, index) => (
        <FormControlLabel
          key={"option" + index}
          value={optionValue}
          control={<Radio />}
          label={<Typography>{optionValue}</Typography>}
        />
      ))}
    </RadioGroup>
  );
};
