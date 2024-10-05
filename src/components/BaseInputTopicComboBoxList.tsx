import { List, Typography } from "@mui/material";
import { FC } from "react";
import { BaseInputTopicComboBoxListItem } from "./BaseInputTopicComboBoxListItem";

type BaseInputTopicComboBoxListProps = {
  values: string[];
  onRemove: (values: string[]) => void;
};
export const BaseInputTopicComboBoxList: FC<
  BaseInputTopicComboBoxListProps
> = (props) => {
  const { values, onRemove } = props;

  const removeHandler = (option: string) => () => {
    const newValues = values.filter(
      (value) => value !== option
    );
    onRemove(newValues);
  };

  const renderedOptions = values.map((value, index) => {
    return (
      <BaseInputTopicComboBoxListItem
        key={"option" + index}
        onClick={removeHandler(value)}
        label={value}
      />
    );
  });

  if (values.length === 0) {
    return (
      <Typography fontStyle="italic">
        ยังไม่ได้เลือกหัวข้อ
      </Typography>
    );
  }

  return (
    <List
      dense
      disablePadding
      sx={{
        minHeight: 150,
        maxHeight: 300,
        overflow: "auto",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "flex-start",
      }}
    >
      {renderedOptions}
    </List>
  );
};
