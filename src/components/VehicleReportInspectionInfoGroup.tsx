import { VehicleReportInspectionModelImpl } from "$types/impl/Vehicle";
import {
	VehicleModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type VehicleReportInspectionInfoGroupProps = {
	report: VehicleReportInspectionModel;
	vehicle: VehicleModel;
	inspectionRoundNumber: number;
};
export const VehicleReportInspectionInfoGroup: FC<
	VehicleReportInspectionInfoGroupProps
> = (props) => {
	const {
		report,
		inspectionRoundNumber,
		vehicle,
	} = props;
	const submit = useSubmit();

	const infoItems =
		VehicleReportInspectionModelImpl.toInfoItems(
			report,
			vehicle,
			inspectionRoundNumber,
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
