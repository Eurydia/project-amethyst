use super::models::VehicleModel;

#[tauri::command(rename_all = "camelCase")]
pub async fn put_attendance_log(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    actual_arrival_datetime: String,
    actual_departure_datetime: String,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE attendance_logs
            SET
                actual_arrival_datetime     = ?,
                actual_departure_datetime   = ?
            WHERE id = ?;
        "#,
    )
    .bind(actual_arrival_datetime)
    .bind(actual_departure_datetime)
    .bind(id)
    .execute(&state.db)
    .await;
    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command]
pub async fn put_driver(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    driver: super::models::DriverModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE drivers
            SET 
                name            = ?,
                surname         = ?,
                contact         = ?,
                license_type    = ?
            WHERE id = ?;
        "#,
    )
    .bind(driver.name)
    .bind(driver.surname)
    .bind(driver.contact)
    .bind(driver.license_type)
    .bind(driver.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command]
pub async fn put_driver_report_general(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::DriverReportModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE driver_general_reports
            SET 
                datetime    = ?,
                title       = ?,
                content     = ?,
                topics      = ?
            WHERE id = ?;
        "#,
    )
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .bind(report.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update faile"),
    }
}

#[tauri::command]
pub async fn put_driver_report_medical(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::DriverReportModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE driver_medical_reports
            SET 
                datetime    = ?,
                title       = ?,
                content     = ?,
                topics      = ?
            WHERE id = ?;
        "#,
    )
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .bind(report.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command]
pub async fn put_pickup_route(
    state: tauri::State<'_, crate::AppState>,
    route: super::models::PickupRouteModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE pickup_routes
            SET 
                name            = ?,
                arrival_time    = ?,
                departure_time  = ?
            WHERE id = ?;
        "#,
    )
    .bind(route.name)
    .bind(route.arrival_time)
    .bind(route.departure_time)
    .bind(route.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command]
pub async fn put_pickup_route_report_general(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::PickupRouteReportModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE pickup_route_general_reports
            SET 
                datetime    = ?,
                title       = ?,
                content     = ?,
                topics      = ?
            WHERE id = ?;
        "#,
    )
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .bind(report.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command]
pub async fn put_vehicle(
    state: tauri::State<'_, crate::AppState>,
    vehicle: VehicleModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE vehicles
            SET 
                license_plate   = ?,
                vendor          = ?,
                vehicle_class   = ?,
                registered_city = ?
            WHERE id = ?;
        "#,
    )
    .bind(vehicle.license_plate)
    .bind(vehicle.vendor)
    .bind(vehicle.vehicle_class)
    .bind(vehicle.registered_city)
    .bind(vehicle.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command]
pub async fn put_vehicle_report_general(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::VehicleReportGeneralModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE vehicle_general_reports
            SET 
                datetime        = ?,
                title           = ?,
                content         = ?,
                topics          = ?
            WHERE id = ?;
        "#,
    )
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .bind(report.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command]
pub async fn put_vehicle_report_inspection(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::VehicleReportInspectionModel,
) -> Result<(), &'static str> {
    let query = sqlx::query(
        r#"
            UPDATE vehicle_report_inspection
            SET 
                datetime        = ?,
                topics          = ?
                content         = ?,

                front_camera    = ?,
                overhead_fan    = ?,
                windows         = ?,
                seatbelts       = ?,
                seats           = ?,
                headlights      = ?,
                turn_signals    = ?,
                brake_light     = ?,
                frame           = ?,
                rearview_mirror = ?,
                sideview_mirror = ?,
                tires           = ?
            WHERE id = ?;

        "#,
    )
    .bind(report.datetime)
    .bind(report.topics)
    .bind(report.front_camera)
    .bind(report.content)
    .bind(report.overhead_fan)
    .bind(report.windows)
    .bind(report.seatbelts)
    .bind(report.seats)
    .bind(report.headlights)
    .bind(report.turn_signals)
    .bind(report.brake_light)
    .bind(report.frame)
    .bind(report.rearview_mirror)
    .bind(report.sideview_mirror)
    .bind(report.tires)
    .bind(report.id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}
