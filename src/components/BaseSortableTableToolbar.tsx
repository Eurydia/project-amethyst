import {
  AddRounded,
  FileDownloadRounded,
  FileUploadRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import { BaseInputWorkbookFileSelect } from "./BaseInputFileSelect";
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
      children: ReactNode | ReactNode[];
      onClick: () => void;
    };
    importButton: {
      disabled?: boolean;
      children: ReactNode | ReactNode[];
      onFileSelect: (file: File) => void;
    };
    exportButton: {
      disabled?: boolean;
      children: ReactNode | ReactNode[];
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
          <BaseInputWorkbookFileSelect
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
