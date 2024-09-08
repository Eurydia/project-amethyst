import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { DriverReportEntry } from "$types/models/Driver";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { DriverReportTable } from "./DriverReportTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverReportEntry>[] =
	[
		{
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime).unix() -
				dayjs(b.datetime).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime).format(
						"HH:mm น. DD MMMM BBBB",
					)}
				</Typography>
			),
		},
		{
			label: "คนขับรถ",
			compare: (a, b) =>
				a.driverName.localeCompare(b.driverName),
			render: (item) => (
				<Typography
					component={Link}
					to={"/drivers/info/" + item.driverId}
				>
					{item.driverName} {item.driverSurname}
				</Typography>
			),
		},
		{
			label: "เรื่อง",
			compare: (a, b) =>
				a.title.localeCompare(b.title),
			render: (item) => (
				<Typography
					component={Link}
					to={
						"/drivers/report/medical/info/" +
						item.id
					}
				>
					{item.title}
				</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) => (
				<Typography>
					{item.topics.join(", ")}
				</Typography>
			),
		},
	];

type DriverReportMedicalTableProps = {
	entries: DriverReportEntry[];
	slotProps: {
		addButton: {
			disabled?: boolean;
			onClick: () => void;
		};
		driverMultiSelect: {
			disabled?: boolean;
			options: MultiSelectOption[];
		};
		topicMultiSelect: {
			options: MultiSelectOption[];
		};
	};
};
export const DriverReportMedicalTable: FC<
	DriverReportMedicalTableProps
> = (props) => {
	const { entries, slotProps } = props;

	return (
		<DriverReportTable
			headers={HEADER_DEFINITIONS}
			entries={entries}
			slotProps={slotProps}
		/>
	);
};
