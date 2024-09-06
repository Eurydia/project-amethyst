import { PickupRouteModelImpl } from "$types/impl/PickupRoute";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type PickupRouteInfoGroupProps = {
	route: PickupRouteModel;
};
export const PickupRouteInfoGroup: FC<
	PickupRouteInfoGroupProps
> = (props) => {
	const { route } = props;
	const submit = useSubmit();

	const infoItems =
		PickupRouteModelImpl.toInfoItems(route);

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
