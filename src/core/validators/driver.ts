import { KNOWN_LICENSE_TYPES } from "$core/constants";
import { DriverFormData } from "$types/models/driver";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  contact: z.string(),
  license_type: z.enum(KNOWN_LICENSE_TYPES),
});

export const DRIVER_MODEL_VALIDATOR = {
  validate: async (data: unknown) => {
    if (!schema.safeParse(data).success) {
      return null;
    }

    const data_ = data as z.infer<typeof schema>;

    const formData: DriverFormData = {
      name: data_.name.normalize().trim(),
      surname: data_.surname.normalize().trim(),
      contact: data_.contact.normalize().trim(),
      license_type: data_.license_type.normalize().trim(),
    };
    return formData;
  },
};
