import {
  VehicleFormData,
  vehicleModelSchema,
} from "$types/models/vehicle";

export const VEHICLE_VALIDATOR = {
  validate: async (data: unknown) => {
    const r = vehicleModelSchema.safeParse(data);
    if (!r.success) {
      return null;
    }

    const data_ = r.data;

    const formData: VehicleFormData = {
      license_plate: data_.license_plate.normalize(),
      vendor: data_.vendor.normalize(),
      vehicle_class: data_.vehicle_class,
      registered_city: data_.registered_city,
    };
    return formData;
  },
};
