import {
  DriverFormData,
  driverModelSchema,
} from "$types/models/driver";

export const DRIVER_MODEL_VALIDATOR = {
  validate: async (data: unknown) => {
    const r = driverModelSchema.safeParse(data);
    if (!r.success) {
      return null;
    }
    const data_ = r.data;
    const formData: DriverFormData = {
      name: data_.name.normalize(),
      surname: data_.surname.normalize(),
      contact: data_.contact.normalize(),
      license_type: data_.license_type,
    };
    return formData;
  },
};
