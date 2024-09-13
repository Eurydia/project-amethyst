import {
	DriverModel,
	DriverReportModel,
} from "$types/models/driver";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { BaseInfoGroup } from "./BaseInfoGroup";
import { BaseTypographyLink } from "./BaseTypographyLink";

type DriverReportGeneralInfoGroupProps = {
	report: DriverReportModel;
	driver: DriverModel;
	slotProps: {
		editButton: {
			onClick: () => void;
		};
	};
};
export const DriverReportGeneralInfoGroup: FC<
	DriverReportGeneralInfoGroupProps
> = (props) => {
	const { report, driver, slotProps } = props;

	const infoItems = [
		{
			label: "ผู้ที่ถูกร้องเรียน",
			value: (
				<BaseTypographyLink
					toPage={"/drivers/info/" + driver.id}
				>
					{`${driver.name} ${driver.surname}`}
				</BaseTypographyLink>
			),
		},
		{
			label: "ลงบันทึกเมื่อ",
			value: (
				<Typography>
					{dayjs(report.datetime)
						.locale("th")
						.format(
							"HH:mm น. วันddddที่ DD MMMM YYYY",
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
					label: "แก้ไขรายละเอียด",
					onClick: slotProps.editButton.onClick,
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
