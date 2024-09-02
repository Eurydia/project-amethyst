import { FolderRounded } from "@mui/icons-material";
import {
	ImageList,
	ImageListItem,
	Stack,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { TypographyButton } from "./TypographyButton";
import { useSubmit } from "react-router-dom";

type GalleryProps = {
	images: string[];
	onOpenRoot: () => void;
};
export const Gallery: FC<GalleryProps> = (
	props,
) => {
	const { images, onOpenRoot } = props;
	const submit = useSubmit();
	let imageGallery = (
		<Typography
			sx={{
				fontStyle: "italic",
			}}
		>
			ไม่พบรูปภาพ
		</Typography>
	);
	if (images.length > 0) {
		imageGallery = (
			<ImageList
				sx={{
					height: 450,
				}}
				cols={3}
			>
				{images.map((image, index) => (
					<ImageListItem key={"image" + index}>
						<img
							alt={image}
							src={image}
							onClick={() =>
								submit(
									{},
									{
										action:
											"/images/" +
											encodeURIComponent(image),
									},
								)
							}
							style={{
								cursor: "pointer",
								objectPosition: "50% 50%",
								aspectRatio: "1/1",
								objectFit: "cover",
							}}
						/>
					</ImageListItem>
				))}
			</ImageList>
		);
	}

	return (
		<Stack
			sx={{
				gap: 1,
			}}
		>
			<TypographyButton
				variant="outlined"
				startIcon={<FolderRounded />}
				onClick={onOpenRoot}
			>
				เปิดคลังภาพ
			</TypographyButton>
			{imageGallery}
		</Stack>
	);
};
