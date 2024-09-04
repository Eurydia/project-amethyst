
CREATE TABLE operational_logs (
    id INTEGER PRIMARY KEY,
    driver_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
    route_id INTEGER NOT NULL,

    start_date TEXT,
    end_date TEXT,

    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES pickup_routes(id) ON DELETE CASCADE
);
