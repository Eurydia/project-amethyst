import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useDropzone } from "react-dropzone";

type BaseInputFileDropzoneProps = {
  onFileAccepted: (files: File[]) => void;
};
export const BaseInputFileDropzone: FC<BaseInputFileDropzoneProps> = (
  props
) => {
  const { onFileAccepted } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls", ".xlsx"],
    },
    onDropAccepted: onFileAccepted,
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <ListItem key={file.name}>
      <ListItemText>
        {file.name} - {file.size} bytes
      </ListItemText>
    </ListItem>
  ));

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 4,
        width: 1,
        minHeight: 400,
        borderWidth: 4,
        borderStyle: "dashed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        {...getRootProps({
          className: "dropzone",
          style: { backgroundColor: "gray" },
        })}
      >
        <input {...getInputProps()} />
        <Typography>ลากไฟล์ลงมาวาง หรือคลิกเพื่อเลือกไฟล์</Typography>
        <List>{acceptedFileItems}</List>
      </div>
    </Paper>
  );
};
