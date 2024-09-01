import { Typography } from "@mui/material";
import dayjs from "dayjs";

export const renderReportToInfoItems = <
	T extends {
		datetime: string;
		title: string;
		content: string;
		topics: string[];
	},
>(
	report: T,
) => {
	return [
		{
			label: "หัวข้อ",
			value: (
				<Typography>{report.title}</Typography>
			),
		},
		{
			label: "บันทึกเมื่อ",
			value: (
				<Typography>
					{dayjs(report.datetime)
						.locale("th")
						.format(
							"HH:mm น. วันdddที่ DD MMMM YYYY",
						)}
				</Typography>
			),
		},
		{
			label: "รายละเอียด",
			value: (
				<Typography>{report.content}</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<Typography>
					{report.topics.join(", ")}
				</Typography>
			),
		},
	];
};
