import {
  PickupRouteModel,
  pickupRouteModelSchema,
} from "$types/models/pickup-route";

export const PICKUP_ROUTE_MODEL_VALIDATOR = {
  validate: async (data: unknown) => {
    const r = pickupRouteModelSchema.safeParse(data);

    if (!r.success) {
      return null;
    }

    const data_ = r.data;

    const formData: PickupRouteModel = {
      driver_id: data_.driver_id,
      id: data_.id,
      name: data_.name.normalize(),
      arrival_time: data_.arrival_time,
      departure_time: data_.departure_time,
    };
    return formData;
  },
};
