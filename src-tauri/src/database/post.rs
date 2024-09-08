use super::models::DriverModel;

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
                expected_departure_datetime
            )
            VALUES(
                ?, ?, ?,

                ?, ?

            );
        "#,
    )
    .bind(driver_id)
    .bind(vehicle_id)
    .bind(route_id)
    .bind(expected_arrival_datetime)
    .bind(expected_departure_datetime)
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
            VALUES(
                ?, ?, ?, 

                ?, ?
            );
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

#[tauri::command(rename_all = "camelCase")]
pub async fn post_driver_report_general(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    driver: DriverModel,
    datetime: String,
    title: String,
    content: String,
    topics: Vec<String>,
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
    .bind(driver.id)
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics.join(","))
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert driver report general"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn post_driver_report_medical(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    driver: DriverModel,
    datetime: String,
    title: String,
    content: String,
    topics: Vec<String>,
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
    .bind(driver.id)
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics.join(","))
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

#[tauri::command(rename_all = "camelCase")]
pub async fn post_pickup_route_report_general(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    route: super::models::PickupRouteModel,
    datetime: String,
    title: String,
    content: String,
    topics: Vec<String>,
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
    .bind(route.id)
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics.join(","))
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert pickup route report general"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn post_vehicle(
    _: tauri::AppHandle,
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

#[tauri::command(rename_all = "camelCase")]
pub async fn post_vehicle_report_general(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    vehicle_id: i64,
    datetime: String,
    title: String,
    content: String,
    topics: String,
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
    .bind(vehicle_id)
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert vehicle report general"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn post_vehicle_report_inspection(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    vehicle_id: i64,
    datetime: String,
    content: String,
    topics: String,
    front_camera: String,
    overhead_fan: String,
    windows: String,
    seatbelts: String,
    seats: String,
    headlights: String,
    turn_signals: String,
    brake_light: String,
    frame: String,
    rearview_mirror: String,
    sideview_mirror: String,
    tires: String,
) -> Result<i64, &'static str> {
    let query = sqlx::query(
        r#"
            INSERT INTO vehicle_inspection_reports (
                vehicle_id, 

                datetime, 
                content, 
                topics, 

                front_camera, 
                overhead_fan, 
                windows, 
                seatbelts, 
                seats, 
                headlights, 
                turn_signals, 
                brake_light, 
                frame, 
                rearview_mirror, 
                sideview_mirror, 
                tires
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        "#,
    )
    .bind(vehicle_id)
    .bind(datetime)
    .bind(content)
    .bind(topics)
    .bind(front_camera)
    .bind(overhead_fan)
    .bind(windows)
    .bind(seatbelts)
    .bind(seats)
    .bind(headlights)
    .bind(turn_signals)
    .bind(brake_light)
    .bind(frame)
    .bind(rearview_mirror)
    .bind(sideview_mirror)
    .bind(tires)
    .execute(&state.db)
    .await;

    match query {
        Ok(result) => Ok(result.last_insert_rowid()),
        Err(_) => Err("Failed to insert vehicle report inspection"),
    }
}
