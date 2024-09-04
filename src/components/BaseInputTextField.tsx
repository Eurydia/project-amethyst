import { TextField } from "@mui/material";
import { FC } from "react";

type BaseInputTextFieldProps = {
	multiline?: boolean;
	minRows?: number;
	placeholder?: string;
	shouldAutoFocus?: boolean;
	isError?: boolean;
	isDisabled?: boolean;
	value: string;
	onChange: (value: string) => void;
};
export const BaseInputTextField: FC<
	BaseInputTextFieldProps
> = (props) => {
	const {
		minRows,
		multiline,
		isError,
		onChange,
		value,
		isDisabled,
		placeholder,
		shouldAutoFocus,
	} = props;

	return (
		<TextField
			fullWidth
			multiline={multiline}
			minRows={minRows}
			error={isError}
			autoFocus={shouldAutoFocus}
			placeholder={placeholder}
			disabled={isDisabled}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			slotProps={{
				htmlInput: {
					autoComplete: "off",
					autoSave: "off",
				},
			}}
		/>
	);
};
