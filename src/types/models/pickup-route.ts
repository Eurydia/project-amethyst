export type PickupRouteModel = {
  id: number;

  name: string;
  arrival_time: string;
  departure_time: string;
};

export type PickupRouteEntry = {
  id: number;
  name: string;

  vehicles: {
    id: number;
    licensePlate: string;
  }[];

  drivers: {
    id: number;
    name: string;
    surname: string;
  }[];
};

export type PickupRouteFormData = {
  name: string;
  arrivalTime: string;
  departureTime: string;
};

export type PickupRouteExportData = {
  ชื่อสาย: string;
  เวลารับเข้า: string;
  เวลารับออก: string;
  รหัส: number;
};
