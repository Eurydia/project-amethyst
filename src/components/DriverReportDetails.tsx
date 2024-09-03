import { TRANSLATION } from "$locale/th";
import { DriverReport } from "$types/models/Driver";
import { Typography } from "@mui/material";
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
			label: TRANSLATION.driverNameAndSurname,
			value: (
				<Link
					to={"/drivers/info/" + report.driverId}
				>
					{report.driverName}{" "}
					{report.driverSurname}
				</Link>
			),
		},
		{
			label: TRANSLATION.globalDatetimePosted,
			value: report.datetime,
		},
		{
			label: TRANSLATION.globalTitle,
			value: report.title,
		},
		{
			label: TRANSLATION.globalContent,
			value: report.content,
		},
		{
			label: TRANSLATION.globalTopics,
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
					children: TRANSLATION.globalEditInfo,
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
