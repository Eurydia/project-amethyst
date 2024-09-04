#[tauri::command]
pub async fn post_attendance_log(
    state: tauri::State<'_, crate::AppState>,
    log: super::models::AttendanceLogModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT 
            INTO attendance_logs(
                driver_id, 
                vehicle_id, 
                route_id, 
                expected_arrival_datetime, 
                expected_departure_datetime
            ) 
            VALUES(?, ?, ?, ?, ?);
        "#,
    )
    .bind(log.driver_id)
    .bind(log.vehicle_id)
    .bind(log.route_id)
    .bind(log.expected_arrival_datetime)
    .bind(log.expected_departure_datetime)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert attendance log"),
    }
}

#[tauri::command]
pub async fn post_operational_log(
    state: tauri::State<'_, crate::AppState>,
    log: super::models::OperationalLogModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT 
            INTO operational_logs(
                driver_id, 
                vehicle_id, 
                route_id, 
                start_date,
                end_date
            ) 
            VALUES (?, ?, ?, ?, ?);
        "#,
    )
    .bind(log.driver_id)
    .bind(log.vehicle_id)
    .bind(log.route_id)
    .bind(log.start_date)
    .bind(log.end_date)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert operational log"),
    }
}

#[tauri::command]
pub async fn post_driver(
    state: tauri::State<'_, crate::AppState>,
    driver: super::models::DriverModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT 
            INTO drivers(
                name, 
                surname,
                contact,
                license_type
            )
            VALUES (?, ?, ?, ?);
        "#,
    )
    .bind(driver.name)
    .bind(driver.surname)
    .bind(driver.contact)
    .bind(driver.license_type)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert driver"),
    }
}

#[tauri::command]
pub async fn post_driver_report_general(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::DriverReportModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT
            INTO driver_general_reports(
                driver_id, 
                datetime, 
                title, 
                content, 
                topics
            )
            VALUES (?, ?, ?, ?, ?);
        "#,
    )
    .bind(report.driver_id)
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert driver report general"),
    }
}

#[tauri::command]
pub async fn post_driver_report_medical(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::DriverReportModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT
            INTO driver_medical_reports(
                driver_id, 
                datetime, 
                title, 
                content, 
                topics
            )
            VALUES (?, ?, ?, ?, ?);
        "#,
    )
    .bind(report.driver_id)
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert driver report medical"),
    }
}

#[tauri::command]
pub async fn post_pickup_route(
    state: tauri::State<'_, crate::AppState>,
    route: super::models::PickupRouteModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT
            INTO pickup_routes(
                name,
                arrival_time, 
                departure_time
            )
            VALUES (?, ?, ?);
        "#,
    )
    .bind(route.name)
    .bind(route.arrival_time)
    .bind(route.departure_time)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert pickup route"),
    }
}

#[tauri::command]
pub async fn post_pickup_route_report_general(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::PickupRouteReportModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT
            INTO pickup_route_general_reports(
                route_id, 
                datetime, 
                title, 
                content, 
                topics
            )
            VALUES (?, ?, ?, ?, ?);
        "#,
    )
    .bind(report.route_id)
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert pickup route report general"),
    }
}

#[tauri::command]
pub async fn post_vehicle(
    state: tauri::State<'_, crate::AppState>,
    vehicle: super::models::VehicleModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT
            INTO vehicles(
                license_plate, 
                vendor, 
                vehicle_class, 
                registered_city
            )
            VALUES (?, ?, ?, ?);
        "#,
    )
    .bind(vehicle.license_plate)
    .bind(vehicle.vendor)
    .bind(vehicle.vehicle_class)
    .bind(vehicle.registered_city)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert vehicle"),
    }
}

#[tauri::command]
pub async fn post_vehicle_report_general(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::VehicleReportGeneralModel,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT
            INTO vehicle_general_reports(
                vehicle_id, 
                datetime, 
                title, 
                content, 
                topics
            )
            VALUES (?, ?, ?, ?, ?);
        "#,
    )
    .bind(report.vehicle_id)
    .bind(report.datetime)
    .bind(report.title)
    .bind(report.content)
    .bind(report.topics)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert vehicle report general"),
    }
}

#[tauri::command]
pub async fn post_vehicle_report_inspection(
    state: tauri::State<'_, crate::AppState>,
    report: super::models::VehicleReportInspectionModel,
) -> Result<i64, &'static str> {
    let super::models::VehicleReportInspectionModel {
        brake_light,
        content,
        datetime,
        frame,
        front_camera,
        headlights,
        id,
        overhead_fan,
        windows,
        vehicle_id,
        seatbelts,
        seats,
        topics,
        rearview_mirror,
        turn_signals,
        sideview_mirror,
        tires,
    } = report;

    let query = sqlx::query(
        r#"
            INSERT
            INTO vehicle_inspection_reports(
                brake_light,
                content,
                datetime,
                frame,
                front_camera,
                headlights,
                id,
                overhead_fan,
                windows,
                vehicle_id,
                seatbelts,
                seats,
                topics,
                rearview_mirror,
                turn_signals,
                sideview_mirror,
                tires
            )   
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        "#,
    )
    .bind(brake_light)
    .bind(content)
    .bind(datetime)
    .bind(frame)
    .bind(front_camera)
    .bind(headlights)
    .bind(id)
    .bind(overhead_fan)
    .bind(windows)
    .bind(vehicle_id)
    .bind(seatbelts)
    .bind(seats)
    .bind(topics)
    .bind(rearview_mirror)
    .bind(turn_signals)
    .bind(sideview_mirror)
    .bind(tires)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert vehicle report inspection"),
    }
}
