import { MultiSelectOption } from "$types/generics";
import { DriverModel } from "$types/models/Driver";

export const DriverModelImpl = {
	toMultiSelectOption: (
		driver: DriverModel,
	): MultiSelectOption => {
		return {
			label: `${driver.name} ${driver.surname}`,
			value: driver.id.toString(),
		};
	},
};
