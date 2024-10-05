import { List } from "@mui/material";
import { FC } from "react";
import { BaseInputMultiSelectItem } from "./BaseInputMultiSelectItem";

type BaseInputMultiSelectProps = {
  disabled?: boolean;
  options: { label: string; value: string }[];
  selectedOptions: string[];
  onChange: (option: string[]) => void;
};
export const BaseInputMultiSelect: FC<
  BaseInputMultiSelectProps
> = (props) => {
  const { options, disabled, selectedOptions, onChange } =
    props;

  const toggleHandler = (value: string) => () => {
    if (!selectedOptions.includes(value)) {
      onChange([...selectedOptions, value]);
      return;
    }
    onChange(
      selectedOptions.filter(
        (selectOption) => selectOption !== value
      )
    );
  };

  const handleToggleAll = () => {
    if (isAllSelect) {
      onChange([]);
      return;
    }
    onChange(options.map(({ value }) => value));
  };

  const renderedOptions = options.map(
    ({ label, value }, index) => {
      const handleClick = toggleHandler(value);
      const isChecked = selectedOptions.includes(value);

      return (
        <BaseInputMultiSelectItem
          key={"item" + index}
          onClick={handleClick}
          label={label}
          isChecked={isChecked}
          isDisabled={disabled}
        />
      );
    }
  );

  const isAllSelect =
    selectedOptions.length === options.length;

  return (
    <List
      dense
      disablePadding
      sx={{
        overflow: "auto",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        width: "100%",
        wordWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      <BaseInputMultiSelectItem
        label="เลือกทั้งหมด"
        onClick={handleToggleAll}
        isBold
        isChecked={isAllSelect}
        isDisabled={disabled}
      />
      {renderedOptions}
    </List>
  );
};
