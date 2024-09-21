import { DriverFormData } from "$types/models/driver";
import Ajv, { JSONSchemaType } from "ajv";

const driverModelSchema: JSONSchemaType<DriverFormData> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    surname: { type: "string", minLength: 1 },
    contact: { type: "string" },
    licenseType: { type: "string", enum: ["ท.1", "ท.2"] },
  },
  required: ["name", "surname", "contact", "licenseType"],
  additionalProperties: false,
};

const ajv = new Ajv();
export const validateDriverModel = ajv.compile(
  driverModelSchema,
);
