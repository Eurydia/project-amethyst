export type VehicleReportInspectionModel = {
  id: number;
  vehicle_id: number;
  datetime: string;
  content: string;
  topics: string;

  front_camera: string;
  overhead_fan: string;
  windows: string;
  seatbelts: string;
  seats: string;
  headlights: string;
  turn_signals: string;
  brake_light: string;
  frame: string;
  rearview_mirror: string;
  sideview_mirror: string;
  tires: string;
};

export type VehicleReportInspectionFormData = Omit<
  VehicleReportInspectionModel,
  "id"
>;

export type VehicleReportInspectionEntry = {
  id: number;
  inspection_round_number: number;
  vehicle_id: number;
  vehicle_license_plate: string;
  datetime: string;
  topics: string[];
};

// TODO: rename attributes
export type VehicleReportInpsectionExportData =
  VehicleReportInspectionModel & {
    vehicle_license_plate: string;
  };
