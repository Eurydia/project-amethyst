import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseDetailsProps = {
	children: {
		label: string;
		value: ReactNode;
	}[];
	onEdit: () => void;
};
export const BaseDetails: FC<BaseDetailsProps> = (
	props,
) => {
	const { onEdit, children } = props;
	return (
		<Stack
			sx={{
				gap: 1,
			}}
		>
			<TypographyButton
				startIcon={<EditRounded />}
				variant="contained"
				onClick={onEdit}
			>
				แก้ไขข้อมูล
			</TypographyButton>
			<FormalLayout>{children}</FormalLayout>
		</Stack>
	);
};
