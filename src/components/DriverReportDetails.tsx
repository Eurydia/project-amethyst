import { DriverReport } from "$types/models/Driver";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type DriverReportDetailsProps = {
	report: DriverReport;
};
export const DriverReportDetails: FC<
	DriverReportDetailsProps
> = (props) => {
	const { report } = props;
	const submit = useSubmit();

	const infoItems = [
		{
			label: "คนขับรถ",
			value: (
				<Link
					to={"/drivers/info/" + report.driverId}
				>
					{`${report.driverName} ${report.driverSurname}`}
				</Link>
			),
		},
		{
			label: "ลงบันทึกเมื่อ",
			value: dayjs(report.datetime)
				.locale("th")
				.format(
					" HH:mm น. วันddddที่ DD MMMM YYYY",
				),
		},
		{
			label: "เรื่อง",
			value: report.title,
		},
		{
			label: "รายละเอียด",
			value: report.content,
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: report.topics.join(", "),
		},
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
	}));

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
