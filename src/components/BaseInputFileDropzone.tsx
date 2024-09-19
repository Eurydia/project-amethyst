import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useDropzone } from "react-dropzone";

type BaseInputFileDropzoneProps = {};
export const BaseInputFileDropzone: FC<
  BaseInputFileDropzoneProps
> = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "application/vnd.ms-excel": [".csv"],
      },
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          padding: 4,
          width: 1,
          minHeight: 400,
          borderWidth: 4,
          borderStyle: "dashed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Typography>
          ลากไฟล์ลงมาวาง หรือคลิกเพื่อเลือกไฟล์
        </Typography>
      </Paper>
      <ul>{acceptedFileItems}</ul>
    </Box>
  );
};
