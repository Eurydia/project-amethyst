import { KNOWN_LICENSE_TYPES } from "$core/constants";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";

type DriverInputLicenseTypeProps = {
  value: string;
  onChange: (value: string) => void;
};
export const DriverInputLicenseType: FC<
  DriverInputLicenseTypeProps
> = (props) => {
  const { value, onChange } = props;

  useEffect(() => {
    if (value.trim().length < 1) {
      onChange(KNOWN_LICENSE_TYPES[0]);
    }
  }, []);

  return (
    <RadioGroup
      row
      value={value}
      onChange={(_, value) => onChange(value)}
    >
      {KNOWN_LICENSE_TYPES.map((lTypes, index) => (
        <FormControlLabel
          key={"option" + index}
          value={lTypes}
          control={<Radio />}
          label={<Typography>{lTypes}</Typography>}
        />
      ))}
    </RadioGroup>
  );
};
