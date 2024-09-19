import {
  AddRounded,
  FileDownloadRounded,
  FileUploadRounded,
  WarningRounded,
} from "@mui/icons-material";
import {
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC } from "react";

type BaseSortableTableToolbarProps = {
  slotProps: {
    searchField: {
      onChange: (value: string) => void;
      value: string;
      placeholder: string;
    };
    addButton: {
      disabled?: boolean;
      label: string;
      onClick: () => void;
      reason?: string;
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
          <Stack spacing={1} direction="row">
            <Button
              variant="contained"
              startIcon={<AddRounded />}
              onClick={slotProps.addButton.onClick}
              disabled={slotProps.addButton.disabled}
            >
              {slotProps.addButton.label}
            </Button>
            {slotProps.addButton.disabled && (
              <Typography
                color="warning"
                fontStyle="italic"
                display="flex"
                flexDirection="row"
                gap={1}
              >
                <WarningRounded />
                {slotProps.addButton.reason}
              </Typography>
            )}
          </Stack>
          <Stack
            useFlexGap
            spacing={1}
            flexWrap="wrap"
            flexDirection="row"
          >
            <Button
              variant="outlined"
              startIcon={<FileUploadRounded />}
              onClick={slotProps.importButton.onClick}
            >
              {slotProps.importButton.label}
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileDownloadRounded />}
              onClick={slotProps.exportButton.onClick}
            >
              {slotProps.exportButton.label}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Toolbar>
  );
};
