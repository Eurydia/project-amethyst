import { VEHICLE_REGISTERED_CITY_OPTIONS } from "$components/VehicleInputRegisteredCity";
import { Validator } from "$types/generics";
import {
  VehicleExportData,
  VehicleFormData,
} from "$types/models/vehicle";

export const VEHICLE_VALIDATOR: Validator<VehicleFormData> =
  {
    validate: async (data: unknown) => {
      const _data = data as VehicleExportData;

      const vehicleClasses = new Set(["รถตู้", "รถบัส"]);
      const vehicleClass = _data.vehicle_class
        .toString()
        .normalize()
        .trim();

      if (!vehicleClasses.has(vehicleClass)) {
        return null;
      }

      const registeredCity = _data.registered_city
        .toString()
        .normalize()
        .trim();

      if (
        !VEHICLE_REGISTERED_CITY_OPTIONS.includes(
          registeredCity
        )
      ) {
        return null;
      }

      const formData: VehicleFormData = {
        licensePlate: _data.license_plate
          .toString()
          .normalize()
          .trim(),
        vendor: _data.vendor.toString().normalize().trim(),
        vehicleClass: _data.vehicle_class,
        registeredCity: "",
      };
      return formData;
    },
  };
