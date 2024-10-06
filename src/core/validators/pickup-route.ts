import {
  pickupRouteExportDataSchema,
  PickupRouteFormData,
} from "$types/models/pickup-route";

export const PICKUP_ROUTE_VALIDATOR = {
  validate: async (data: unknown) => {
    const r = pickupRouteExportDataSchema.safeParse(data);
    if (!r.success) {
      return null;
    }
    const formData: PickupRouteFormData = {
      name: r.data["ชื่อสาย"],
      arrival_time: r.data["เวลารับเข้า"],
      departure_time: r.data["เวลารับออก"],
    };
    return formData;
  },
};
