import {
  AddRounded,
  FileDownloadRounded,
  FileUploadRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { FC } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseSortableTableToolbarProps = {
  slotProps: {
    searchField: {
      onChange: (value: string) => void;
      value: string;
      placeholder: string;
    };
    addButton: {
      label: string;
      disabled?: boolean;
      onClick: () => void;
    };
    importButton: {
      label?: string;
      disabled?: boolean;
      onClick?: () => void;
    };
    exportButton: {
      label?: string;
      disabled?: boolean;
      onClick?: () => void;
    };
  };
};
export const BaseSortableTableToolbar: FC<
  BaseSortableTableToolbarProps
> = (props) => {
  const { slotProps } = props;
  return (
    <Toolbar disableGutters variant="dense">
      <Stack
        width={1}
        spacing={1}
        useFlexGap
        flexWrap="wrap"
        alignItems="flex-start"
      >
        <Stack
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width={1}
        >
          <TypographyButton
            variant="contained"
            startIcon={<AddRounded />}
            onClick={slotProps.addButton.onClick}
            disabled={slotProps.addButton.disabled}
          >
            {slotProps.addButton.label}
          </TypographyButton>
          <Stack
            spacing={1}
            flexWrap="wrap"
            flexDirection="row"
            useFlexGap
          >
            <TypographyButton
              variant="outlined"
              startIcon={<FileUploadRounded />}
              onClick={slotProps.importButton.onClick}
            >
              {slotProps.importButton.label}
            </TypographyButton>
            <TypographyButton
              variant="outlined"
              startIcon={<FileDownloadRounded />}
              onClick={slotProps.exportButton.onClick}
            >
              {slotProps.exportButton.label}
            </TypographyButton>
          </Stack>
        </Stack>
        <TextField
          fullWidth
          autoComplete="off"
          autoCapitalize="off"
          placeholder={slotProps.searchField.placeholder}
          value={slotProps.searchField.value}
          onChange={(e) =>
            slotProps.searchField.onChange(e.target.value)
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    </Toolbar>
  );
};
