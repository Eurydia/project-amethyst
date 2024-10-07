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
  onChange: (value: string) => void;
};
export const VehicleInputVendor: FC<
  VehicleInputVendorProps
> = (props) => {
  const { onChange, options, value } = props;
  const optionSet = new Set(
    options.map((option) => option.normalize().trim())
  );

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
          error={value.trim().length === 0}
        />
      )}
      renderOption={(optionProps, option) => {
        const { key, ...rest } = optionProps;
        const _option = option.normalize().trim();
        const label = optionSet.has(_option)
          ? option
          : `เพิ่มหจก. "${_option}"`;
        return (
          <ListItem
            key={key}
            {...rest}
          >
            <ListItemText disableTypography>
              <Typography>{label}</Typography>
            </ListItemText>
          </ListItem>
        );
      }}
      filterOptions={(options, state) => {
        const inputValue = state.inputValue
          .normalize()
          .trim();
        const items = filterStrings(options, inputValue);
        if (items.length === 0 && inputValue.length > 0) {
          items.push(inputValue);
        }
        return items;
      }}
    />
  );
};
