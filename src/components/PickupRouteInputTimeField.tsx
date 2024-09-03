import { TimeField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC } from "react";

type PickupRouteInputTimeFieldProps = {
	value: Dayjs | null;
	onChange: (value: Dayjs) => void;
};
export const PickupRouteInputTimeField: FC<
	PickupRouteInputTimeFieldProps
> = (props) => {
	const { onChange, value } = props;

	return (
		<TimeField
			fullWidth
			formatDensity="spacious"
			margin="normal"
			format="HH:mm น."
			value={value}
			onChange={(value) => {
				if (value === null) {
					return;
				}
				onChange(value);
			}}
		/>
	);
};
