import { FormalLayout } from "$layouts/FormalLayout";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const { title, children, slotProps, onClose, open } =
    props;
  return (
    <Dialog
      disableRestoreFocus
      disablePortal
      maxWidth="lg"
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle component="div">{title}</DialogTitle>
      <DialogContent>
        <FormalLayout>{children}</FormalLayout>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button
          variant="contained"
          {...slotProps.submitButton}
        />
        <Button variant="outlined" onClick={onClose}>
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );
};
