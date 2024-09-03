import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseInfoGroupProps = {
	children: {
		label: string;
		value: ReactNode;
	}[];
	slotProps: {
		editButton: {
			onClick: () => void;
		};
	};
};
export const BaseInfoGroup: FC<
	BaseInfoGroupProps
> = (props) => {
	const { children, slotProps } = props;
	return (
		<Stack spacing={1}>
			<TypographyButton
				variant="contained"
				startIcon={<EditRounded />}
				onClick={slotProps.editButton.onClick}
			>
				แก้ไขข้อมูล
			</TypographyButton>
			<FormalLayout>{children}</FormalLayout>
		</Stack>
	);
};
