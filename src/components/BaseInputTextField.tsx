import { TextField } from "@mui/material";
import { FC } from "react";

type BaseInputTextFieldProps = {
	placeholder?: string;
	shouldAutoFocus?: boolean;
	isRequired?: boolean;
	isDisabled?: boolean;
	value: string;
	onChange: (value: string) => void;
};
export const BaseInputTextField: FC<
	BaseInputTextFieldProps
> = (props) => {
	const {
		isRequired,
		onChange,
		value,
		isDisabled,
		placeholder,
		shouldAutoFocus,
	} = props;

	const isEmpty = value.trim().length === 0;

	return (
		<TextField
			fullWidth
			error={isEmpty && isRequired}
			autoFocus={shouldAutoFocus}
			placeholder={placeholder}
			disabled={isDisabled}
			required={isRequired}
			value={value}
			onChange={(e) => {
				if (isEmpty) {
					return;
				}
				onChange(e.target.value);
			}}
		/>
	);
};
