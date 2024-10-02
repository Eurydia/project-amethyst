import {
  CITIES,
  KNOWN_VEHICLE_CLASSES,
} from "$core/constants";
import { VehicleFormData } from "$types/models/vehicle";
import { z } from "zod";

const schema = z.object({
  license_plate: z.string().min(1),
  vendor: z.string().min(1),
  vehicle_class: z.enum(KNOWN_VEHICLE_CLASSES),
  registered_city: z.enum(CITIES),
});

export const VEHICLE_VALIDATOR = {
  validate: async (data: unknown) => {
    if (!schema.safeParse(data).success) {
      return null;
    }

    const data_ = data as z.infer<typeof schema>;

    const formData: VehicleFormData = {
      license_plate: data_.license_plate.normalize().trim(),
      vendor: data_.vendor.normalize().trim(),
      vehicle_class: data_.vehicle_class,
      registered_city: data_.registered_city,
    };
    return formData;
  },
};
