#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct OperationalLogModel {
    pub id: i64,
    pub driver_id: i64,
    pub vehicle_id: i64,
    pub route_id: i64,

    pub start_date: Option<String>,
    pub end_date: Option<String>,
}

#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct AttendanceLogModel {
    pub id: i64,
    pub driver_id: i64,
    pub vehicle_id: i64,
    pub route_id: i64,

    pub expected_arrival_datetime: String,
    pub actual_arrival_datetime: Option<String>,

    pub expected_departure_datetime: String,
    pub actual_departure_datetime: Option<String>,
}

#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct VehicleModel {
    pub id: i64,

    pub license_plate: String,
    pub vendor: String,
    pub vehicle_class: String,
    pub registered_city: String,
}
#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct VehicleReportGeneralModel {
    pub id: i64,
    pub vehicle_id: i64,

    pub datetime: String,
    pub title: String,
    pub content: String,
    pub topics: String,
}

#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct VehicleReportInspectionModel {
    pub id: i64,
    pub vehicle_id: i64,

    pub datetime: String,
    pub title: String,
    pub content: String,
    pub topics: String,

    pub front_camera: String,
    pub overhead_fan: String,
    pub windows: String,
    pub seatbelts: String,
    pub seats: String,
    pub headlights: String,
    pub turn_signals: String,
    pub brake_light: String,
    pub frame: String,
    pub rearview_mirror: String,
    pub sideview_mirror: String,
    pub tires: String,
}

#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct DriverModel {
    pub id: i64,

    pub name: String,
    pub surname: String,
    pub contact: String,
    pub license_type: String,
}

#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct DriverReportModel {
    pub id: i64,
    pub driver_id: i64,

    pub datetime: String,
    pub title: String,
    pub content: String,
    pub topics: String,
}

#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct PickupRouteModel {
    pub id: i64,

    pub name: String,
    pub arrival_time: String,
    pub departure_time: String,
}

#[derive(Debug, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct PickupRouteReportModel {
    pub id: i64,
    pub route_id: i64,

    pub datetime: String,
    pub title: String,
    pub content: String,
    pub topics: String,
}
