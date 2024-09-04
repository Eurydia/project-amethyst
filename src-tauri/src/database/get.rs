macro_rules! get_one {
    ($table_name:expr, $id:expr, $db:expr) => {
        match sqlx::query_as(
            format!(
                r#"
                SELECT * FROM {}
                WHERE id = ?
                "#,
                $table_name,
            )
            .as_str(),
        )
        .bind($id)
        .fetch_optional(&$db)
        .await
        {
            Ok(entry) => Ok(entry),
            Err(_) => Ok(None),
        }
    };
}

macro_rules! get_all {
    ($table_name:expr, $db:expr) => {
        match sqlx::query_as(
            format!(
                r#"
                SELECT * FROM {}
                ORDER BY id DESC;
                "#,
                $table_name
            )
            .as_str(),
        )
        .bind($table_name)
        .fetch_all(&$db)
        .await
        {
            Ok(entries) => Ok(entries),
            Err(err) => {
                dbg!(err);
                Ok(Vec::new())
            }
        }
    };
}

#[tauri::command]
pub async fn get_topic_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<String>, &'static str> {
    let topics: Vec<(String,)> = match sqlx::query_as(
        r#"
            SELECT topics FROM driver_general_reports
            UNION ALL
            SELECT topics FROM driever_medical_reports
            UNION ALL
            SELECT topics FROM vehicle_general_reports
            UNION ALL
            SELECT topics FROM vehicle_inspection_reports
            UNION ALL
            SELECT topics FROM pickup_route_general_reports;
        "#,
    )
    .fetch_all(&state.db)
    .await
    {
        Ok(topics) => topics,
        Err(_) => return Ok(Vec::new()),
    };
    let mut unique_topics = std::collections::HashSet::<String>::new();
    for (topic,) in topics {
        unique_topics.insert(topic);
    }

    Ok(unique_topics.into_iter().collect())
}

#[tauri::command]
pub async fn get_operational_log_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::OperationalLogModel>, &'static str> {
    get_all!("operational_logs", state.db)
}

#[tauri::command]
pub async fn get_operational_log_today(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::OperationalLogModel>, &'static str> {
    let entires = match sqlx::query_as(
        r#"
            SELECT * FROM operational_logs
            WHERE (start_date = '' OR DATE(start_date) <= DATE('now'))
            AND (end_date = '' OR DATE(end_date) >= DATE('now'))
            ORDER BY id DESC;
        "#,
    )
    .fetch_all(&state.db)
    .await
    {
        Ok(entries) => entries,
        Err(_) => return Ok(Vec::new()),
    };

    Ok(entires)
}

#[tauri::command]
pub async fn get_driver_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::DriverModel>, &'static str> {
    get_all!("drivers", state.db)
}

#[tauri::command(rename_all = "camelCase")]
pub async fn get_driver(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    driver_id: i64,
) -> Result<Option<super::models::DriverModel>, &'static str> {
    get_one!("drivers", driver_id, state.db)
}

#[tauri::command]
pub async fn get_driver_report_general_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::DriverReportModel>, &'static str> {
    get_all!("driver_general_reports", state.db)
}

#[tauri::command(rename_all = "camelCase")]
pub async fn get_driver_report_general(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    report_id: i64,
) -> Result<Option<super::models::DriverReportModel>, &'static str> {
    get_one!("driver_general_reports", report_id, state.db)
}

#[tauri::command]
pub async fn get_driver_report_medical_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::DriverReportModel>, &'static str> {
    get_all!("driver_medical_reports", state.db)
}

#[tauri::command]
pub async fn get_driver_report_medical(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    report_id: i64,
) -> Result<Option<super::models::DriverReportModel>, &'static str> {
    get_one!("driver_medical_reports", report_id, state.db)
}

#[tauri::command]
pub async fn get_vehicle_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::VehicleModel>, &'static str> {
    get_all!("vehicles", state.db)
}

#[tauri::command(rename_all = "camelCase")]
pub async fn get_vehicle(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    vehicle_id: i64,
) -> Result<Option<super::models::VehicleModel>, &'static str> {
    get_one!("vehicles", vehicle_id, state.db)
}
#[tauri::command]
pub async fn get_vehicle_report_general_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::VehicleReportGeneralModel>, &'static str> {
    get_all!("vehicle_general_reports", state.db)
}
#[tauri::command]
pub async fn get_vehicle_report_general(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    report_id: i64,
) -> Result<Option<super::models::VehicleReportGeneralModel>, &'static str> {
    get_one!("vehicle_general_reports", report_id, state.db)
}
#[tauri::command]
pub async fn get_vehicle_report_inspection_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::VehicleReportInspectionModel>, &'static str> {
    get_all!("vehicle_inspection_reports", state.db)
}
#[tauri::command]
pub async fn get_vehicle_report_inspection(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    report_id: i64,
) -> Result<Option<super::models::VehicleReportInspectionModel>, &'static str> {
    get_one!("vehicle_inspection_reports", report_id, state.db)
}
//////////////////////////////////////////////////////////////////////////////
#[tauri::command]
pub async fn get_pickup_route_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::PickupRouteModel>, &'static str> {
    get_all!("pickup_routes", state.db)
}
#[tauri::command(rename_all = "camelCase")]
pub async fn get_pickup_route(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    route_id: i64,
) -> Result<Option<super::models::PickupRouteModel>, &'static str> {
    get_one!("pickup_routes", route_id, state.db)
}
#[tauri::command]
pub async fn get_pickup_route_report_general_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::PickupRouteReportModel>, &'static str> {
    get_all!("pickup_route_general_reports", state.db)
}
#[tauri::command]
pub async fn get_pickup_route_report_general(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
    report_id: i64,
) -> Result<Option<super::models::PickupRouteReportModel>, &'static str> {
    get_one!("pickup_route_general_reports", report_id, state.db)
}

#[tauri::command]
pub async fn get_attendance_log_all(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::AttendanceLogModel>, &'static str> {
    get_all!("attendance_logs", state.db)
}

#[tauri::command]
pub async fn get_attendance_log_today(
    _: tauri::AppHandle,
    state: tauri::State<'_, crate::AppState>,
) -> Result<Vec<super::models::AttendanceLogModel>, &'static str> {
    match sqlx::query_as(
        r#"
            SELECT * 
            FROM attendance_logs
            WHERE DATE(expected_arrival_datetime, 'localtime') = DATE('now', 'localtime')
            ORDER BY id DESC;
        "#,
    )
    .fetch_all(&state.db)
    .await
    {
        Ok(entries) => Ok(entries),
        Err(err) => {
            dbg!(err);
            Ok(Vec::new())
        }
    }
}
