CREATE TABLE vehicle_inspection_reports (
  id INTEGER PRIMARY KEY,
  vehicle_id INTEGER NOT NULL,

  datetime TEXT NOT NULL,
  content TEXT NOT NULL,
  topics TEXT,
  front_camera TEXT,
  overhead_fan TEXT,
  windows TEXT,
  seatbelts TEXT,
  seats TEXT,
  headlights TEXT,
  turn_signals TEXT,
  brake_light TEXT,
  frame TEXT,
  rearview_mirror TEXT,
  sideview_mirror TEXT,
  tires TEXT,

  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);
