import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { Validator } from "$types/generics";
import {
  VehicleReportInpsectionExportData,
  VehicleReportInspectionFormData,
} from "$types/models/vehicle-report-inspection";
import dayjs from "dayjs";

export const VEHICLE_REPORT_INSPECTION_VALIDATOR: Validator<VehicleReportInspectionFormData> =
  {
    validate: async (data: unknown) => {
      const _data =
        data as VehicleReportInpsectionExportData;

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

      const formData: VehicleReportInspectionFormData = {
        vehicle_id: vehicle.id,
        datetime: datetime.format(),

        topics: _data.topics
          .split(",")
          .map((topic) => topic.trim().normalize())
          .filter((topic) => topic.length > 0)
          .join(","),

        content: _data.content
          .toString()
          .trim()
          .normalize(),
        front_camera: _data.front_camera
          .toString()
          .trim()
          .normalize(),
        overhead_fan: _data.overhead_fan
          .toString()
          .trim()
          .normalize(),
        windows: _data.windows
          .toString()
          .trim()
          .normalize(),
        seatbelts: _data.seatbelts
          .toString()
          .trim()
          .normalize(),
        seats: _data.seats.toString().trim().normalize(),
        headlights: _data.headlights
          .toString()
          .trim()
          .normalize(),
        turn_signals: _data.turn_signals
          .toString()
          .trim()
          .normalize(),
        brake_light: _data.brake_light
          .toString()
          .trim()
          .normalize(),
        frame: _data.frame.toString().trim().normalize(),
        rearview_mirror: _data.rearview_mirror
          .toString()
          .trim()
          .normalize(),
        sideview_mirror: _data.sideview_mirror
          .toString()
          .trim()
          .normalize(),
        tires: _data.tires.toString().trim().normalize(),
      };
      return formData;
    },
  };
