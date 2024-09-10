import {
	DriverModel,
	DriverReportModel,
} from "$types/models/Driver";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type DriverReportInfoGroupProps = {
	report: DriverReportModel;
	driver: DriverModel;
	slotProps: {
		editButton: {
			label: string;
			onClick: () => void;
		};
	};
};
export const DriverReportInfoGroup: FC<
	DriverReportInfoGroupProps
> = (props) => {
	const { report, driver, slotProps } = props;

	const infoItems = [
		{
			label: "คนขับรถ",
			value: (
				<Typography
					component={Link}
					to={"/drivers/info/" + driver.id}
				>
					{`${driver.name} ${driver.surname}`}
				</Typography>
			),
		},
		{
			label: "ลงบันทึกเมื่อ",
			value: (
				<Typography>
					{dayjs(report.datetime)
						.locale("th")
						.format(
							" HH:mm น. วันddddที่ DD MMMM YYYY",
						)}
				</Typography>
			),
		},
		{
			label: "เรื่อง",
			value: (
				<Typography>{report.title}</Typography>
			),
		},
		{
			label: "รายละเอียด",
			value:
				report.content.trim().length > 0 ? (
					<Typography>
						{report.content}
					</Typography>
				) : (
					<Typography fontStyle="italic">
						ไม่มีรายละเอียด
					</Typography>
				),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value:
				report.topics.length > 0 ? (
					<Typography>
						{report.topics.replaceAll(",", ", ")}
					</Typography>
				) : (
					<Typography fontStyle="italic">
						ไม่มีหัวข้อที่เกี่ยวข้อง
					</Typography>
				),
		},
	];

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					label: slotProps.editButton.label,
					onClick: slotProps.editButton.onClick,
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
