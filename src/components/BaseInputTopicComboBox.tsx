import { filterObjects } from "$core/filter";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { BaseInputTopicComboBoxList } from "./BaseInputTopicComboBoxList";

type BaseInputTopicComboBoxProps = {
  options: string[];
  values: string[];
  onChange: (value: string[]) => void;
};
export const BaseInputTopicComboBox: FC<
  BaseInputTopicComboBoxProps
> = (props) => {
  const { values, options, onChange } = props;
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const optionSet = new Set(
    options
      .map((option) => option.trim().normalize())
      .filter((option) => option.length > 0)
  );
  const valueSet = new Set(
    values
      .map((option) => option.trim().normalize())
      .filter((value) => value.length > 0)
  );

  return (
    <Stack spacing={1}>
      <Autocomplete
        freeSolo
        disableListWrap
        disablePortal
        disableClearable
        fullWidth
        options={options}
        value={searchValue}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) =>
          setInputValue(newInputValue)
        }
        filterOptions={(fOptions, params) => {
          const filtered = filterObjects(
            fOptions.filter(
              (option) => !valueSet.has(option)
            ),
            params.inputValue,
            undefined
          );
          const inputValue = params.inputValue.trim();
          if (
            inputValue.length > 0 &&
            !filtered.includes(inputValue)
          ) {
            filtered.push(inputValue);
          }
          return filtered;
        }}
        onChange={(_, newValues) => {
          if (!valueSet.has(newValues)) {
            onChange([...values, newValues]);
          }
          setSearchValue("");
          setInputValue("");
        }}
        renderOption={({ key, ...optionProps }, option) => (
          <ListItem
            {...optionProps}
            key={key}
          >
            <ListItemText disableTypography>
              <Typography>
                {optionSet.has(option)
                  ? option
                  : `เพิ่มหัวข้อ "${option}"`}
              </Typography>
            </ListItemText>
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="ค้นหา หรือเพิ่มหัวข้อ"
          />
        )}
      />
      <BaseInputTopicComboBoxList
        onRemove={onChange}
        values={values}
      />
    </Stack>
  );
};
