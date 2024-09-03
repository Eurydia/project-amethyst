import { FormalLayout } from "$layouts/FormalLayout";
import { EditRounded } from "@mui/icons-material";
import {
	ButtonProps,
	Stack,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseInfoGroupProps = {
	children: {
		label: string;
		value: ReactNode;
	}[];
	slotProps: {
		editButton: ButtonProps;
	};
};
export const BaseInfoGroup: FC<
	BaseInfoGroupProps
> = (props) => {
	const { slotProps, children } = props;
	return (
		<Stack spacing={1}>
			<TypographyButton
				{...slotProps.editButton}
				startIcon={<EditRounded />}
				variant="contained"
			/>
			<FormalLayout>{children}</FormalLayout>
		</Stack>
	);
};
