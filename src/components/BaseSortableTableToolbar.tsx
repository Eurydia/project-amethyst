import {
  AddRounded,
  FileDownloadRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
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
      onClick: () => void;
    };
    importButton: {
      disabled?: boolean;
      onFileSelect: (file: File) => void;
    };
    exportButton: {
      disabled?: boolean;
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
        <Stack
          useFlexGap
          spacing={1}
          flexWrap="wrap"
          flexDirection="row"
        >
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            {...slotProps.addButton}
          >
            เพิ่ม
          </Button>
          <BaseInputWorkbookFileSelect
            startIcon={<AddRounded />}
            {...slotProps.importButton}
          >
            เพิ่มจากไฟล์
          </BaseInputWorkbookFileSelect>
        </Stack>
        <Button
          variant="outlined"
          startIcon={<FileDownloadRounded />}
          {...slotProps.exportButton}
        >
          ดาวน์โหลด
        </Button>
      </Stack>
      <BaseInputTextField
        {...slotProps.searchField}
        autoFocus
        startIcon={<SearchRounded />}
      />
    </Stack>
  );
};
