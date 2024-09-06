import { PickupRouteReportModelImpl } from "$types/impl/PickupRoute";
import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type PickupRouteReportInfoGroupProps = {
	route: PickupRouteModel;
	report: PickupRouteReportModel;
};
export const PickupRouteReportInfoGroup: FC<
	PickupRouteReportInfoGroupProps
> = (props) => {
	const { report, route } = props;
	const submit = useSubmit();

	const infoItems =
		PickupRouteReportModelImpl.toInfoItems(
			report,
			route,
		);

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					onClick: () =>
						submit(
							{},
							{
								action: "./edit",
							},
						),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
