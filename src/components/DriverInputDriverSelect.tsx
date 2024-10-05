import { filterItems } from "$core/filter";
import { DriverModel } from "$types/models/driver";
import { LockRounded } from "@mui/icons-material";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { FC } from "react";

type DriverInputDriverSelectProps = {
  disabled?: boolean;
  value: DriverModel;
  options: DriverModel[];
  onChange: (value: DriverModel) => void;
};
export const DriverInputDriverSelect: FC<
  DriverInputDriverSelectProps
> = (props) => {
  const { value, onChange, disabled, options } = props;

  return (
    <Autocomplete
      disabled={disabled}
      popupIcon={disabled && <LockRounded />}
      disableClearable
      disableListWrap
      disablePortal
      noOptionsText="ไม่พบคนขับรถ"
      value={value}
      options={options}
      onChange={(_, value) => {
        if (value === null) {
          return;
        }
        onChange(value);
      }}
      groupBy={(option) => option.license_type}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) =>
        `${option.name} ${option.surname}`
      }
      renderOption={(optionProps, option) => {
        const { key, ...rest } = optionProps;
        return (
          <ListItem
            key={key}
            {...rest}
          >
            <ListItemText>
              {option.name} {option.surname}
            </ListItemText>
          </ListItem>
        );
      }}
      filterOptions={(options, state) =>
        filterItems(options, state.inputValue, [
          "name",
          "surname",
          "contact",
        ])
      }
      renderInput={(props) => (
        <TextField
          {...props}
          required
          placeholder="ค้นหาด้วยชื่อ, นามสกุล, หรือเบอร์ติดต่อ"
        />
      )}
    />
  );
};
