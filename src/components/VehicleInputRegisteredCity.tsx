import { CITIES } from "$core/constants";
import { filterItems } from "$core/filter";
import { Autocomplete, TextField } from "@mui/material";
import { FC, useEffect } from "react";

type VehicleInputRegisteredCityProps = {
  value: string;
  onChange: (value: string) => void;
};
export const VehicleInputRegisteredCity: FC<
  VehicleInputRegisteredCityProps
> = (props) => {
  const { onChange, value } = props;

  useEffect(() => {
    if (value.normalize().trim().length < 0) {
      onChange(CITIES[0]);
    }
  }, [value]);

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
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} />}
      filterOptions={(options, state) =>
        filterItems(options, state.inputValue, undefined)
      }
    />
  );
};
