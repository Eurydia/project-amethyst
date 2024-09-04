CREATE TABLE driver_general_reports (
  id INTEGER PRIMARY KEY,
  driver_id INTEGER NOT NULL,

  datetime TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  topics TEXT,

  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);
