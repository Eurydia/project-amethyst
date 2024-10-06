import { filterStrings } from "$core/filter";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";

type VehicleInputVendorProps = {
  options: string[];
  value: string;
  error?: boolean;
  onChange: (value: string) => void;
};
export const VehicleInputVendor: FC<
  VehicleInputVendorProps
> = (props) => {
  const { onChange, options, value, error } = props;
  const optionSet = new Set(options);
  return (
    <Autocomplete
      freeSolo
      disableClearable
      fullWidth
      selectOnFocus
      clearOnBlur
      getOptionLabel={(option) => option}
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props}>
          <ListItemText disableTypography>
            <Typography>
              {optionSet.has(option)
                ? option
                : 'เพิ่มหจก. "${option}"'}
            </Typography>
          </ListItemText>
        </ListItem>
      )}
      filterOptions={(options, state) => {
        const items = filterStrings(
          options,
          state.inputValue
        );
        if (
          items.length === 0 &&
          state.inputValue.trim().length > 0
        ) {
          items.push(state.inputValue.normalize());
        }
        return items;
      }}
    />
  );
};
