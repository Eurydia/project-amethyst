import { KNOWN_LICENSE_TYPES } from "$core/constants";
import { DriverFormData } from "$types/models/driver";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";

type DriverInputLicenseTypeProps = {
  value: DriverFormData["license_type"];
  onChange: (value: DriverFormData["license_type"]) => void;
};
export const DriverInputLicenseType: FC<
  DriverInputLicenseTypeProps
> = (props) => {
  const { value, onChange } = props;

  return (
    <RadioGroup
      row
      value={value}
      onChange={(_, value) =>
        onChange(value as DriverFormData["license_type"])
      }
    >
      {KNOWN_LICENSE_TYPES.map((optionValue, index) => (
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
