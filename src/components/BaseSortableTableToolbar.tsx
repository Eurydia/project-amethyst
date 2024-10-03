import {
  AddRounded,
  FileDownloadRounded,
  FileUploadRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { BaseInputFileSelect } from "./BaseInputFileSelect";
import { BaseInputTextField } from "./BaseInputTextField";

type BaseSortableTableToolbarProps = {
  slotProps: {
    searchField: {
      onChange: (value: string) => void;
      value: string;
      placeholder: string;
    };
    addButton: {
      disabled?: boolean;
      children: string;
      onClick: () => void;
    };
    importButton: {
      disabled?: boolean;
      children: string;
      onFileSelect: (file: File) => void;
    };
    exportButton: {
      children: string;
      onClick: () => void;
    };
  };
};
export const BaseSortableTableToolbar: FC<
  BaseSortableTableToolbarProps
> = (props) => {
  const { slotProps } = props;

  return (
    <Stack spacing={1}>
      <Stack
        useFlexGap
        spacing={1}
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-between"
        width={1}
      >
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          {...slotProps.addButton}
        />
        <Stack
          useFlexGap
          spacing={1}
          flexWrap="wrap"
          flexDirection="row"
        >
          <BaseInputFileSelect
            startIcon={<FileUploadRounded />}
            {...slotProps.importButton}
          />
          <Button
            variant="outlined"
            startIcon={<FileDownloadRounded />}
            {...slotProps.exportButton}
          />
        </Stack>
      </Stack>
      <BaseInputTextField
        {...slotProps.searchField}
        autoFocus
        startIcon={<SearchRounded />}
      />
    </Stack>
  );
};
