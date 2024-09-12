import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC } from "react";

type BaseInputDateFieldProps = {
	value: Dayjs;
	onChange: (value: Dayjs) => void;
};
export const BaseInputDateField: FC<
	BaseInputDateFieldProps
> = (props) => {
	const { value, onChange } = props;
	return (
		<DateField
			fullWidth
			formatDensity="spacious"
			value={value}
			onChange={(next) => {
				if (next === null) {
					return;
				}
				onChange(next);
			}}
			format="DD/MM/YYYY"
		/>
	);
};
