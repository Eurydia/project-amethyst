#[tauri::command(rename_all = "camelCase")]
pub async fn put_attendance_log(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    actual_arrival_datetime: Option<String>,
    actual_departure_datetime: Option<String>,
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

#[tauri::command(rename_all = "camelCase")]
pub async fn put_driver(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    name: String,
    surname: String,
    contact: String,
    license_type: String,
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
    .bind(name)
    .bind(surname)
    .bind(contact)
    .bind(license_type)
    .bind(id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn put_driver_report_general(
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    datetime: String,
    title: String,
    content: String,
    topics: Vec<String>,
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
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics.join(","))
    .bind(id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn put_driver_report_medical(
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    datetime: String,
    title: String,
    content: String,
    topics: Vec<String>,
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
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics.join(","))
    .bind(id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn put_pickup_route(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    name: String,
    arrival_time: String,
    departure_time: String,
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
    .bind(name)
    .bind(arrival_time)
    .bind(departure_time)
    .bind(id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn put_pickup_route_report_general(
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    datetime: String,
    title: String,
    content: String,
    topics: Vec<String>,
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
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics.join(","))
    .bind(id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub async fn put_vehicle(
    state: tauri::State<'_, crate::AppState>,
    id: i64,
    license_plate: String,
    vendor: String,
    vehicle_class: String,
    registered_city: String,
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
    .bind(license_plate)
    .bind(vendor)
    .bind(vehicle_class)
    .bind(registered_city)
    .bind(id)
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
    id: i64,
    datetime: String,
    title: String,
    content: String,
    topics: Vec<String>,
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
    .bind(datetime)
    .bind(title)
    .bind(content)
    .bind(topics.join(","))
    .bind(id)
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
    id: i64,
    datetime: String,
    content: String,
    topics: Vec<String>,

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
    .bind(datetime)
    .bind(topics.join(","))
    .bind(front_camera)
    .bind(content)
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
    .bind(id)
    .execute(&state.db)
    .await;

    match query {
        Ok(_) => Ok(()),
        Err(_) => Err("Update fail"),
    }
}
