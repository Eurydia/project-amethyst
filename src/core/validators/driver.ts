import {
  driverExportDataSchema,
  DriverFormData,
} from "$types/models/driver";

export const DRIVER_MODEL_VALIDATOR = {
  validate: (data: unknown) => {
    const r = driverExportDataSchema.safeParse(data);
    if (!r.success) {
      console.error(r.error);
      return null;
    }
    const data_ = r.data;
    const formData: DriverFormData = {
      name: data_["ชื่อ"],
      surname: data_["นามสกุล"],
      contact: data_["เบอร์ติดต่อ"],
      license_type: data_["ประเภทใบขับขี่"],
    };
    return formData;
  },
};
