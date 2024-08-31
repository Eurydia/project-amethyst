import { FormalLayout } from "$layouts/FormalLayout";
import { SaveRounded } from "@mui/icons-material";
import {
	ButtonProps,
	Grid2,
} from "@mui/material";
import { TypographyButton } from "./TypographyButton";
import { FC, ReactNode } from "react";

type BaseFormProps = {
	children: {
		label: string;
		value: ReactNode;
	}[];
	slotProps: {
		submitButton: ButtonProps;
		cancelButton: ButtonProps;
	};
};
export const BaseForm: FC<BaseFormProps> = (
	props,
) => {
	const { children, slotProps } = props;
	return (
		<Grid2 container>
			<FormalLayout>{children}</FormalLayout>
			<Grid2
				size={12}
				sx={{
					paddingY: 1,
					display: "flex",
					flexDirection: "row",
					gap: 1,
					flexWrap: "wrap",
				}}
			>
				<TypographyButton
					{...slotProps.submitButton}
					startIcon={<SaveRounded />}
					variant="contained"
				>
					บันทึก
				</TypographyButton>
				<TypographyButton
					{...slotProps.cancelButton}
					variant="outlined"
				>
					ยกเลิก
				</TypographyButton>
			</Grid2>
		</Grid2>
	);
};
