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
            open::open_dir,
            open::open_file,
            //////////////////////////////////////////
            get_topic_all,
            get_driver_all,
            get_driver,
            get_driver_report_general_all,
            get_driver_report_general,
            get_driver_report_medical_all,
            get_driver_report_medical,
            get_vehicle_all,
            get_vehicle,
            get_vehicle_vendor_all,
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

    // let op_logs = get_operational_log_today(app.handle(), app.state()).await?;
    // let att_logs = get_attendance_log_today(app.handle(), app.state()).await?;

    // let today = chrono::Local::now();
    // if op_logs.len() <= att_logs.len() {
    //     for op_log in op_logs {
    //         let route =
    //             match get_pickup_route(app.app_handle(), app.state(), op_log.route_id).await? {
    //                 Some(route) => route,
    //                 None => continue,
    //             };
    //         let arrival_time =
    //             chrono::NaiveTime::parse_from_str(route.arrival_time.as_str(), "%H:%M").unwrap();

    //         let depature_time =
    //             chrono::NaiveTime::parse_from_str(route.departure_time.as_str(), "%H:%M").unwrap();

    //         let expected_arrival_datetime = today.with_time(arrival_time).unwrap();
    //         let expected_departure_datetime = today.with_time(depature_time).unwrap();

    //         post_attendance_log(
    //             app.app_handle(),
    //             app.state(),
    //             op_log.driver_id,
    //             op_log.vehicle_id,
    //             op_log.route_id,
    //             expected_arrival_datetime
    //                 .format("%Y-%m-%dT%H:%M:%S%z")
    //                 .to_string(),
    //             expected_departure_datetime
    //                 .format("%Y-%m-%dT%H:%M:%S%z")
    //                 .to_string(),
    //         )
    //         .await?;
    //     }
    // }

    app.run(|_, _| {});

    Ok(())
}
