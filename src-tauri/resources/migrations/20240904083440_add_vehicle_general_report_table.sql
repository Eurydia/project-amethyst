CREATE TABLE vehicle_general_reports (
    id INTEGER PRIMARY KEY,
    vehicle_id INTEGER NOT NULL,

    datetime TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    topics TEXT,

    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE
);
