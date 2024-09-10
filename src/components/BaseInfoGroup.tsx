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
			label: string;
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
				{slotProps.editButton.label}
			</TypographyButton>
			<FormalLayout>{children}</FormalLayout>
		</Stack>
	);
};
