export type DriverModel = {
  id: number;

  name: string;
  surname: string;
  contact: string;
  license_type: string;
};

export type DriverEntry = {
  id: number;
  name: string;
  surname: string;

  vehicles: {
    id: number;
    licensePlate: string;
  }[];

  routes: {
    id: number;
    name: string;
  }[];
};

export type DriverFormData = {
  name: string;
  surname: string;
  contact: string;
  licenseType: string;
};

// TODO: rename properties
export type DriverExportData = {
  id: number;
  name: string;
  surname: string;
  contact: string;
  licenseType: string;
};
