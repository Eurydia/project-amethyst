import { CITIES } from "$core/constants";
import { filterStrings } from "$core/filter";
import { VehicleModel } from "$types/models/vehicle";
import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";

type VehicleInputRegisteredCityProps = {
  value: VehicleModel["registered_city"];
  onChange: (
    value: VehicleModel["registered_city"]
  ) => void;
};
export const VehicleInputRegisteredCity: FC<
  VehicleInputRegisteredCityProps
> = (props) => {
  const { onChange, value } = props;

  return (
    <Autocomplete
      freeSolo
      disableClearable
      disableListWrap
      disabledItemsFocusable
      fullWidth
      options={CITIES}
      value={value}
      getOptionLabel={(option) => option}
      getOptionKey={(option) => option}
      onChange={(_, newValue) =>
        onChange(
          newValue as VehicleModel["registered_city"]
        )
      }
      renderInput={(params) => <TextField {...params} />}
      filterOptions={(options, state) =>
        filterStrings(
          options,
          state.inputValue
        ) as typeof options
      }
    />
  );
};
