export type VehicleModel = {
  id: number;

  license_plate: string;
  vendor: string;
  vehicle_class: string;
  registered_city: string;
};

export type VehicleFormData = Omit<VehicleModel, "id">;

export type VehicleEntry = {
  id: number;
  license_plate: string;

  drivers: {
    id: number;
    name: string;
    surname: string;
  }[];

  routes: {
    id: number;
    name: string;
  }[];
};

// TODO: Rename attributes
export type VehicleExportData = {
  license_plate: string;
  vendor: string;
  vehicle_class: string;
  registered_city: string;
};
