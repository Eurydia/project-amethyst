import {
  VehicleExportDataSchema,
  VehicleFormData,
} from "$types/models/vehicle";

export const VEHICLE_VALIDATOR = {
  validate: async (data: unknown) => {
    const r = VehicleExportDataSchema.omit({
      รหัส: true,
    }).safeParse(data);

    if (!r.success) {
      return null;
    }

    const data_ = r.data;

    const formData: VehicleFormData = {
      license_plate: data_["ประเภทรถ"].trim().normalize(),
      vehicle_class: data_["ประเภทรถ"],
      registered_city: data_["จังหวัดที่จดทะเบียน"],
      vendor: data_["หจก."],
    };
    return formData;
  },
};
