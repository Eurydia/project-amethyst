import { filterItems } from "$core/filter";
import { PickupRouteModel } from "$types/models/pickup-route";
import { LockRounded } from "@mui/icons-material";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";

type PickupRouteInputPickupRouteSelectProps = {
  isDisabled?: boolean;
  options: PickupRouteModel[];
  value: PickupRouteModel;
  onChange: (value: PickupRouteModel) => void;
};
export const PickupRouteInputPickupRouteSelect: FC<
  PickupRouteInputPickupRouteSelectProps
> = (props) => {
  const { value, onChange, isDisabled, options } = props;

  return (
    <Autocomplete
      disableClearable
      disableListWrap
      disablePortal
      disabled={isDisabled}
      popupIcon={isDisabled ? <LockRounded /> : undefined}
      onChange={(_, value) => {
        if (value === null) {
          return;
        }
        onChange(value);
      }}
      value={value}
      options={options}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.name}
      renderOption={({ key, ...rest }, option) => (
        <ListItem key={key} {...rest}>
          <ListItemText disableTypography>
            <Typography>{option.name}</Typography>
          </ListItemText>
        </ListItem>
      )}
      filterOptions={(options, state) =>
        filterItems(options, state.inputValue, ["name"])
      }
      renderInput={(params) => (
        <TextField
          {...params}
          required
          placeholder="ค้นหาสายรถ"
        />
      )}
    />
  );
};
