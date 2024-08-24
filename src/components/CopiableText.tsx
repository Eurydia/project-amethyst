import {
	Tooltip,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { toast } from "react-toastify";

type CopyableTextProps = { children: string };
export const CopiableText: FC<
	CopyableTextProps
> = (props) => {
	const { children } = props;

	const handleCopy = () => {
		navigator.clipboard.writeText(children);
		toast.success("คัดลอกสำเร็จ");
	};

	return (
		<Tooltip
			title={
				<Typography>กดเพื่อคัดลอก</Typography>
			}
			placement="top"
			arrow
		>
			<Typography
				onClick={handleCopy}
				sx={{
					cursor: "pointer",
					textDecoration: "underline",
					textDecorationStyle: "wavy",
					textDecorationThickness: "from-font",
				}}
			>
				{children}
			</Typography>
		</Tooltip>
	);
};
