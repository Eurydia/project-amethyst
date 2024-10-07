import { filterObjects } from "$core/filter";
import { VehicleModel } from "$types/models/vehicle";
import { LockRounded } from "@mui/icons-material";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";

type VehicleInputVehicleProps = {
  disabled?: boolean;
  value: VehicleModel;
  onChange: (value: VehicleModel) => void;
  options: VehicleModel[];
};
export const VehicleInputVehicle: FC<
  VehicleInputVehicleProps
> = (props) => {
  const { options, disabled, value, onChange } = props;

  return (
    <Autocomplete
      disabled={disabled}
      popupIcon={disabled && <LockRounded />}
      onChange={(_, value) => {
        if (value === null) {
          return;
        }
        onChange(value);
      }}
      disableClearable
      disableListWrap
      disablePortal
      noOptionsText="ไม่พบรถรับส่ง"
      value={value}
      options={options}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.license_plate}
      groupBy={(option) => option.vendor}
      renderInput={(inputParams) => (
        <TextField
          {...inputParams}
          required
          placeholder="ค้นหาด้วยเลขทะเบียน, หจก., หรือจังหวัดที่จดทะเบียน"
        />
      )}
      filterOptions={(options, state) =>
        filterObjects(options, state.inputValue, [
          (option) => option.license_plate,
          (option) => option.vendor,
          (option) => option.registered_city,
        ])
      }
      renderOption={(optionProps, option) => {
        const { key, ...rest } = optionProps;
        return (
          <ListItem
            key={key}
            {...rest}
          >
            <ListItemText disableTypography>
              <Typography>
                {option.license_plate}
              </Typography>
            </ListItemText>
          </ListItem>
        );
      }}
    />
  );
};
