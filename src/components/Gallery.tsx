import { FolderRounded } from "@mui/icons-material";
import { Stack, Toolbar } from "@mui/material";
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
			<Toolbar
				variant="dense"
				disableGutters
			>
				<TypographyButton
					variant="outlined"
					startIcon={<FolderRounded />}
					onClick={onOpenRoot}
				>
					เปิดแฟ้มภาพ
				</TypographyButton>
			</Toolbar>
			<Stack
				direction="row"
				overflow="auto"
				width="100%"
				spacing={1}
				useFlexGap
				flexWrap="nowrap"
			>
				{images.map((image, index) => (
					<img
						key={"image" + index}
						src={image}
						width="33%"
						style={{
							maxWidth: "200px",
							objectPosition: "50% 50%",
							aspectRatio: "1/1",
							objectFit: "cover",
						}}
					/>
				))}
			</Stack>
		</Stack>
	);
};
