import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { Validator } from "$types/generics";
import {
  VehicleReportGeneralExportData,
  VehicleReportGeneralFormData,
} from "$types/models/vehicle-report-general";
import dayjs from "dayjs";

export const VEHICLE_REPORT_GENERAL_VALIDATOR: Validator<VehicleReportGeneralFormData> =
  {
    validate: async (data: unknown) => {
      const _data = data as VehicleReportGeneralExportData;

      const vehicle = await tauriGetVehicle(
        _data.vehicle_id
      );
      if (vehicle === null) {
        return null;
      }

      const datetime = dayjs(_data.datetime);
      if (!datetime.isValid()) {
        return null;
      }

      const title = _data.title
        .toString()
        .trim()
        .normalize();
      if (title.length === 0) {
        return null;
      }

      const formData: VehicleReportGeneralFormData = {
        title,
        vehicle,
        datetime: datetime.format(),
        content: _data.content.trim().normalize(),
        topics: _data.topics
          .split(",")
          .map((topic) => topic.trim().normalize())
          .filter((topic) => topic.length > 0),
      };
      return formData;
    },
  };
