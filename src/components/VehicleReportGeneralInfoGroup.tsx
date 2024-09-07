import { VehicleReportGeneralModelImpl } from "$types/impl/Vehicle";
import {
	VehicleModel,
	VehicleReportGeneralModel,
} from "$types/models/Vehicle";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type VehicleReportGeneralInfoGroupProps = {
	report: VehicleReportGeneralModel;
	vehicle: VehicleModel;
};
export const VehicleReportGeneralInfoGroup: FC<
	VehicleReportGeneralInfoGroupProps
> = (props) => {
	const { report, vehicle } = props;
	const submit = useSubmit();
	const infoItems =
		VehicleReportGeneralModelImpl.toInfoItems(
			report,
			vehicle,
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
