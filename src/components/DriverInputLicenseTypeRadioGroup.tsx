import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";

type DriverInputLicenseTypeRadioGroupProps = {
  value: string;
  onChange: (value: string) => void;
};
export const DriverInputLicenseTypeRadioGroup: FC<
  DriverInputLicenseTypeRadioGroupProps
> = (props) => {
  const { value, onChange } = props;

  useEffect(() => {
    if (value.trim().length === 0) {
      onChange("ท.1");
    }
  }, []);

  return (
    <RadioGroup
      row
      value={value}
      onChange={(_, value) => onChange(value)}
    >
      <FormControlLabel
        value="ท.1"
        control={<Radio />}
        label={<Typography>ท.1 (รถตู้)</Typography>}
      />
      <FormControlLabel
        value="ท.2"
        control={<Radio />}
        label={<Typography>ท.2 (รถบัส)</Typography>}
      />
    </RadioGroup>
  );
};
