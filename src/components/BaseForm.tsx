import { FormalLayout } from "$layouts/FormalLayout";
import {
  CloseRounded,
  SaveRounded,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { BaseFormTransition } from "./BaseFormTransition";
import { BaseInputButton } from "./BaseInputButton";
type BaseFormProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  slotProps: {
    submitButton: {
      onClick: () => void;
      disabled: boolean | undefined;
      disabledReasons: string[];
    };
  };
  children: {
    label: string;
    value: ReactNode;
  }[];
};
export const BaseForm: FC<BaseFormProps> = (props) => {
  const { title, children, slotProps, onClose, open } =
    props;

  return (
    <Dialog
      keepMounted
      TransitionComponent={BaseFormTransition}
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Tooltip title={<Typography>ปิด</Typography>}>
          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </Tooltip>
        {title}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <FormalLayout>{children}</FormalLayout>
          <Stack
            useFlexGap
            direction="row"
            flexWrap="wrap"
            spacing={1}
          >
            <BaseInputButton
              variant="contained"
              startIcon={<SaveRounded />}
              {...slotProps.submitButton}
            >
              ยืนยัน
            </BaseInputButton>
            <Button
              variant="outlined"
              onClick={onClose}
            >
              ยกเลิก
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
