import {
  AddRounded,
  FileDownloadRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC } from "react";
import { BaseInputButton } from "./BaseInputButton";
import { BaseInputWorkbookFileSelect } from "./BaseInputFileSelect";
import { BaseInputTextField } from "./BaseInputTextField";

type BaseSortableTableToolbarProps = {
  slotProps: {
    searchField: {
      onChange: (value: string) => void;
      value: string;
      placeholder: string;
    };
    addButton:
      | { hidden: true }
      | {
          hidden?: false | undefined;
          disabled?: boolean | undefined;
          disabledReasons: string[];
          onClick: () => void;
        };
    importButton:
      | {
          hidden?: false | undefined;
          onFileSelect: (file: File) => void;
        }
      | {
          hidden: true;
        };
    exportButton: {
      disabled: boolean | undefined;
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
          {!slotProps.addButton.hidden && (
            <BaseInputButton
              variant="contained"
              startIcon={<AddRounded />}
              disabled={slotProps.addButton.disabled}
              disabledReasons={
                slotProps.addButton.disabledReasons
              }
              onClick={slotProps.addButton.onClick}
            >
              เพิ่ม
            </BaseInputButton>
          )}
          {!slotProps.importButton.hidden && (
            <BaseInputWorkbookFileSelect
              startIcon={<AddRounded />}
              onFileSelect={
                slotProps.importButton.onFileSelect
              }
            >
              เพิ่มจากไฟล์
            </BaseInputWorkbookFileSelect>
          )}
        </Stack>

        <BaseInputButton
          variant="outlined"
          startIcon={<FileDownloadRounded />}
          disabledReasons={[
            "ต้องมีอย่างน้อยหนึ่งรายการถึงจะดาวน์โหลดได้",
          ]}
          {...slotProps.exportButton}
        >
          ดาวน์โหลด
        </BaseInputButton>
      </Stack>
      <BaseInputTextField
        {...slotProps.searchField}
        autoFocus
        startIcon={<SearchRounded />}
      />
    </Stack>
  );
};
