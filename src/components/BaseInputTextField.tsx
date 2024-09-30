import { WarningRounded } from "@mui/icons-material";
import {
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

type BaseInputTextFieldProps = {
  multiline?: boolean;
  minRows?: number;
  placeholder?: string;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  startIcon?: ReactNode;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  errorText?: string;
};
export const BaseInputTextField: FC<
  BaseInputTextFieldProps
> = (props) => {
  const { startIcon, onChange, error, errorText, ...rest } =
    props;

  let helperText: ReactNode = null;
  if (error) {
    helperText = (
      <Typography>
        <WarningRounded />
        {errorText}
      </Typography>
    );
  }

  return (
    <TextField
      fullWidth
      onChange={(e) => onChange(e.target.value)}
      error={error}
      helperText={helperText}
      {...rest}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
