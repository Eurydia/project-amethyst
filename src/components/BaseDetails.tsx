import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import {
	ButtonProps,
	Stack,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseDetailsProps = {
	children: {
		label: string;
		value: ReactNode;
	}[];
	slotProps: {
		editButton: ButtonProps;
	};
};
export const BaseDetails: FC<BaseDetailsProps> = (
	props,
) => {
	const { slotProps, children } = props;
	return (
		<Stack
			sx={{
				gap: 1,
			}}
		>
			<TypographyButton
				{...slotProps.editButton}
				startIcon={<EditRounded />}
				variant="contained"
				children="แก้ไขข้อมูล"
			/>
			<FormalLayout>{children}</FormalLayout>
		</Stack>
	);
};
