CREATE TABLE pickup_route_general_report (
  id INTEGER PRIMARY KEY,
  route_id INTEGER NOT NULL,

  datetime TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  topics TEXT,
  FOREIGN KEY (route_id) REFERENCES pickup_routes(id) ON DELETE CASCADE
);