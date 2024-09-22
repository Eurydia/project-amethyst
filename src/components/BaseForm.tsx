/** @format */

import { FormalLayout } from "$layouts/FormalLayout";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FC, ReactNode } from "react";

type BaseFormProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  slotProps: {
    submitButton: {
      startIcon: ReactNode;
      disabled: boolean;
      children: string;
      onClick: () => void;
    };
  };
  children: {
    label: string;
    value: ReactNode;
  }[];
};
export const BaseForm: FC<BaseFormProps> = (props) => {
  const { title, children, slotProps, onClose, open } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle component="div">{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <FormalLayout>{children}</FormalLayout>
          <Stack
            useFlexGap
            direction="row"
            flexWrap="wrap"
            spacing={1}
          >
            <Button
              variant="contained"
              {...slotProps.submitButton}
            />
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
