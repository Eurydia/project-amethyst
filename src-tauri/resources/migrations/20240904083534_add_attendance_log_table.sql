CREATE TABLE attendance_logs (
  id INTEGER PRIMARY KEY,
  driver_id INTEGER NOT NULL,
  vehicle_id INTEGER NOT NULL,
  route_id INTEGER NOT NULL,

  expected_arrival_datetime TEXT NOT NULL,
  actual_arrival_datetime TEXT,
  expected_departure_datetime TEXT NOT NULL,
  actual_departure_datetime TEXT,

  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
  FOREIGN KEY (route_id) REFERENCES pickup_routes(id) ON DELETE CASCADE
);