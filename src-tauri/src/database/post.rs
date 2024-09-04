#[tauri::command(rename_all = "camelCase")]
pub async fn post_attendance_log(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    driver_id: i64,
    vehicle_id: i64,
    route_id: i64,
    expected_arrival_datetime: String,
    expected_departure_datetime: String,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT 
            INTO attendance_logs(
                driver_id, 
                vehicle_id, 
                route_id, 

                expected_arrival_datetime, 
                expected_departure_datetime,
                actual_arrival_datetime,
                actual_departure_datetime
            )
            VALUES(?, ?, ?, ?, ?, ?, ?);
        "#,
    )
    .bind(driver_id)
    .bind(vehicle_id)
    .bind(route_id)
    .bind(expected_arrival_datetime)
    .bind(expected_departure_datetime)
    .bind(String::default())
    .bind(String::default())
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(err) => {
            dbg!(err);
            Err("Failed to insert attendance log")
        }
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn post_operational_log(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    driver: super::models::DriverModel,
    vehicle: super::models::VehicleModel,
    route: super::models::PickupRouteModel,
    start_date: String,
    end_date: String,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT 
            INTO operational_logs (
                driver_id, 
                vehicle_id, 
                route_id, 
                start_date,
                end_date
            ) 
            VALUES (?, ?, ?, ?, ?);
        "#,
    )
    .bind(driver.id)
    .bind(vehicle.id)
    .bind(route.id)
    .bind(start_date)
    .bind(end_date)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(err) => {
            dbg!(err);
            Err("Failed to insert operational log")
        }
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn post_driver(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    name: String,
    surname: String,
    contact: String,
    license_type: String,
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
    .bind(name)
    .bind(surname)
    .bind(contact)
    .bind(license_type)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert driver"),
    }
}

#[tauri::command]
pub async fn post_driver_report_general(
    _: tauri::AppHandle,
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
    _: tauri::AppHandle,
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

#[tauri::command(rename_all = "camelCase")]
pub async fn post_pickup_route(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    name: String,
    arrival_time: String,
    departure_time: String,
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
    .bind(name)
    .bind(arrival_time)
    .bind(departure_time)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert pickup route"),
    }
}

#[tauri::command]
pub async fn post_pickup_route_report_general(
    _: tauri::AppHandle,
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

#[tauri::command(rename_all = "camelCase")]
pub async fn post_vehicle(
    state: tauri::State<'_, crate::AppState>,
    license_plate: String,
    vendor: String,
    vehicle_class: String,
    registered_city: String,
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
    .bind(license_plate)
    .bind(vendor)
    .bind(vehicle_class)
    .bind(registered_city)
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
