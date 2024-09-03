import { FormalLayout } from "$layouts/FormalLayout";
import { Grid2 } from "@mui/material";
import { FC, ReactNode } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseFormProps = {
	children: {
		label: string;
		value: ReactNode;
	}[];
	slotProps: {
		submitButton: {
			startIcon: ReactNode;
			disabled: boolean;
			label: string;
			onClick: () => void;
		};
		cancelButton: {
			onClick: () => void;
		};
	};
};
export const BaseForm: FC<BaseFormProps> = (
	props,
) => {
	const { children, slotProps } = props;
	return (
		<Grid2
			container
			sx={{
				width: "100%",
			}}
		>
			<FormalLayout>{children}</FormalLayout>
			<Grid2
				size={{ xs: 12 }}
				sx={{
					paddingY: 1,
					gap: 1,
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				<TypographyButton
					variant="contained"
					startIcon={
						slotProps.submitButton.startIcon
					}
					onClick={slotProps.submitButton.onClick}
					disabled={
						slotProps.submitButton.disabled
					}
				>
					{slotProps.submitButton.label}
				</TypographyButton>
				<TypographyButton
					variant="outlined"
					onClick={slotProps.cancelButton.onClick}
				>
					ยกเลิก
				</TypographyButton>
			</Grid2>
		</Grid2>
	);
};
