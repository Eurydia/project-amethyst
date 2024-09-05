import { openFile } from "$backend/open";
import { useResolveImages } from "$hooks/useResolveImages";
import { FolderRounded } from "@mui/icons-material";
import {
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Stack,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseGalleryProps = {
	dirPath: string[];
};
export const BaseGallery: FC<BaseGalleryProps> = (
	props,
) => {
	const { dirPath } = props;
	const { images, handleDirOpen } =
		useResolveImages(dirPath);

	let imageGallery = (
		<Typography>ไม่พบรูปภาพ</Typography>
	);

	if (images.length > 0) {
		imageGallery = (
			<ImageList
				cols={3}
				sx={{ height: 400 }}
			>
				{images.map(
					({ name, src, path }, index) => (
						<ImageListItem key={"image" + index}>
							<img
								alt={name}
								src={src}
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
					),
				)}
			</ImageList>
		);
	}

	return (
		<Stack spacing={1}>
			<TypographyButton
				variant="outlined"
				startIcon={<FolderRounded />}
				onClick={handleDirOpen}
			>
				เปิดคลังภาพ
			</TypographyButton>
			{imageGallery}
		</Stack>
	);
};
