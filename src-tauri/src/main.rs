// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use database::get::*;
use database::post::*;
use database::put::*;
use tauri::Manager;
mod database;
mod open;

struct AppState {
    db: sqlx::pool::Pool<sqlx::sqlite::Sqlite>,
}

#[tokio::main]
async fn main() -> Result<(), &'static str> {
    let builder = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open::open_path,
            get_topic_all,
            get_driver_all,
            get_driver,
            get_driver_report_general_all,
            get_driver_report_general,
            get_driver_report_medical_all,
            get_driver_report_medical,
            get_vehicle_all,
            get_vehicle,
            get_vehicle_report_general_all,
            get_vehicle_report_general,
            get_vehicle_report_inspection_all,
            get_vehicle_report_inspection,
            get_pickup_route_all,
            get_pickup_route,
            get_pickup_route_report_general_all,
            get_pickup_route_report_general,
            get_attendance_log_all,
            get_attendance_log_today,
            get_operational_log_all,
            get_operational_log_today,
            //////////////////////////////////////////
            post_driver,
            post_driver_report_general,
            post_driver_report_medical,
            post_vehicle,
            post_vehicle_report_general,
            post_vehicle_report_inspection,
            post_pickup_route,
            post_pickup_route_report_general,
            post_attendance_log,
            post_operational_log,
            //////////////////////////////////////////
            put_attendance_log,
            put_driver,
            put_driver_report_general,
            put_driver_report_medical,
            put_vehicle,
            put_vehicle_report_general,
            put_vehicle_report_inspection,
            put_pickup_route,
            put_pickup_route_report_general
        ])
        .build(tauri::generate_context!());

    let app = match builder {
        Ok(app) => app,
        Err(_) => {
            return Err("Cannot build app");
        }
    };

    let db = database::init::prepare_db(&app).await?;
    app.manage(AppState { db });

    app.run(|_, _| {});

    Ok(())
}
