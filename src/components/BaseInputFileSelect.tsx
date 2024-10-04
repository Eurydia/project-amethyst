import { Button } from "@mui/material";
import { FC, ReactNode, useRef } from "react";
import { Fragment } from "react/jsx-runtime";

type BaseInputFileSelectProps = {
  disabled?: boolean;
  children: ReactNode | ReactNode[];
  startIcon?: React.ReactNode;
  onFileSelect: (file: File) => void;
};
export const BaseInputFileSelect: FC<
  BaseInputFileSelectProps
> = (props) => {
  const { onFileSelect, ...rest } = props;
  const fileSelectRef = useRef<HTMLInputElement | null>(
    null
  );

  return (
    <Fragment>
      <Button
        {...rest}
        variant="outlined"
        onClick={() => {
          if (fileSelectRef.current === null) {
            return;
          }
          fileSelectRef.current.click();
        }}
      />
      <input
        ref={fileSelectRef}
        accept=".xlsx, xls"
        type="file"
        hidden
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
    </Fragment>
  );
};
