import { Button } from "@mui/material";
import { FC, ReactNode, useRef } from "react";

type BaseInputWorkbookFileSelectProps = {
  disabled?: boolean;
  children: ReactNode | ReactNode[];
  startIcon?: React.ReactNode;
  onFileSelect: (file: File) => void;
};
export const BaseInputWorkbookFileSelect: FC<
  BaseInputWorkbookFileSelectProps
> = (props) => {
  const { onFileSelect, ...rest } = props;
  const fileSelectRef = useRef<HTMLInputElement | null>(
    null
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form ref={formRef}>
      <Button
        {...rest}
        variant="outlined"
        onClick={() => {
          if (
            fileSelectRef.current === null ||
            formRef.current === null
          ) {
            return;
          }
          formRef.current.reset();
          fileSelectRef.current.click();
        }}
      />
      <input
        hidden
        ref={fileSelectRef}
        accept=".xlsx, xls"
        type="file"
        onChange={(event) => {
          const files = event.target.files;
          if (files === null || files.length === 0) {
            return;
          }
          const file = files[0];
          onFileSelect(file);
        }}
        style={{
          display: "none",
          visibility: "hidden",
        }}
      />
    </form>
  );
};
