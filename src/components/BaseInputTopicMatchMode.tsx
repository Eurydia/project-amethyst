import {
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { FC } from "react";

type BaseInputTopicMatchModeProps = {
	value: boolean;
	onChange: (value: boolean) => void;
};
export const BaseInputTopicMatchMode: FC<
	BaseInputTopicMatchModeProps
> = (props) => {
	const { value, onChange } = props;

	return (
		<RadioGroup
			row
			value={value ? "yes" : "no"}
			onChange={(e) =>
				onChange(e.target.value === "yes")
			}
		>
			<FormControlLabel
				value="yes"
				control={<Radio />}
				label="มีทุกหัวข้อที่เลือก"
			/>
			<FormControlLabel
				value="no"
				control={<Radio />}
				label="มีอย่างน้อยหนึ่งหัวข้อที่เลือก"
			/>
		</RadioGroup>
	);
};
