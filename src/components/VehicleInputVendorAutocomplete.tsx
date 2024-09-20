import { filterItems } from "$core/filter";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

type VehicleInputVendorAutocompleteProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  helperText?: ReactNode;
  error?: boolean;
};
export const VehicleInputVendorAutocomplete: FC<
  VehicleInputVendorAutocompleteProps
> = (props) => {
  const { onChange, options, value, ...rest } = props;

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
        <TextField {...params} {...rest} />
      )}
      renderOption={(props, option) => (
        <ListItem {...props}>
          <ListItemText disableTypography>
            <Typography>
              {optionSet.has(option)
                ? option
                : `เพิ่มหจก. "${option}"`}
            </Typography>
          </ListItemText>
        </ListItem>
      )}
      filterOptions={(options, state) => {
        const items = filterItems(
          options,
          state.inputValue,
          undefined,
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
