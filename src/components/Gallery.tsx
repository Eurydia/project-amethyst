import { FolderRounded } from "@mui/icons-material";
import {
	ImageList,
	ImageListItem,
	Stack,
} from "@mui/material";
import { FC } from "react";
import { TypographyButton } from "./TypographyButton";

type GalleryProps = {
	images: string[];
	onOpenRoot: () => void;
};
export const Gallery: FC<GalleryProps> = (
	props,
) => {
	const { images, onOpenRoot } = props;

	return (
		<Stack spacing={1}>
			<TypographyButton
				variant="text"
				startIcon={<FolderRounded />}
				onClick={onOpenRoot}
			>
				เปิดคลังภาพ
			</TypographyButton>
			<ImageList
				sx={{ height: 450 }}
				cols={3}
			>
				{images.map((image, index) => (
					<ImageListItem key={"image" + index}>
						<img
							alt={image}
							src={image}
							loading="lazy"
							style={{
								objectPosition: "50% 50%",
								aspectRatio: "1/1",
								objectFit: "cover",
							}}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Stack>
	);
};
