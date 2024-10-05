import { openDir, openFile } from "$backend/open";
import { FolderRounded } from "@mui/icons-material";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import { FileEntry } from "@tauri-apps/api/fs";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { FC } from "react";
import { TypographyButton } from "./TypographyButton";

const REGEX =
  /([^\\\/]+\.(jpg|jpeg|png|gif|webp|svg|apng|bmp|ico))$/i;

type BaseGalleryProps = {
  dirPath: string;
  fileEntries: FileEntry[];
};
export const BaseGallery: FC<BaseGalleryProps> = (
  props
) => {
  const { fileEntries, dirPath } = props;

  const images = fileEntries.filter(
    (entry) =>
      entry.children === undefined && REGEX.test(entry.path)
  );

  let imageGallery = (
    <Typography fontStyle="italic">คลังภาพว่าง</Typography>
  );
  if (images.length > 0) {
    imageGallery = (
      <ImageList
        cols={3}
        sx={{ height: 400 }}
      >
        {images.map(({ name, path }, index) => (
          <ImageListItem key={"image" + index}>
            <img
              alt={name}
              src={convertFileSrc(path)}
              onClick={() => openFile(path)}
              loading="lazy"
              style={{
                cursor: "pointer",
                objectPosition: "50% 50%",
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
            <ImageListItemBar title={name} />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <Stack spacing={1}>
      <TypographyButton
        variant="outlined"
        startIcon={<FolderRounded />}
        onClick={async () => openDir(dirPath)}
      >
        เปิดคลังภาพ
      </TypographyButton>
      {imageGallery}
    </Stack>
  );
};
