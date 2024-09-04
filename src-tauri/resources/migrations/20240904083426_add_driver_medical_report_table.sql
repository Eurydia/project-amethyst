CREATE TABLE driver_medical_reports (
    id INTEGER PRIMARY KEY,
    driver_id INTEGER NOT NULL,

    datetime TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    topics TEXT,

    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);