import { DriverReportModelImpl } from "$types/impl/Driver";
import {
	DriverModel,
	DriverReportModel,
} from "$types/models/Driver";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type DriverReportInfoGroupProps = {
	report: DriverReportModel;
	driver: DriverModel;
};
export const DriverReportInfoGroup: FC<
	DriverReportInfoGroupProps
> = (props) => {
	const { report, driver } = props;
	const submit = useSubmit();

	const infoItems =
		DriverReportModelImpl.toInfoItems(
			report,
			driver,
		);

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
