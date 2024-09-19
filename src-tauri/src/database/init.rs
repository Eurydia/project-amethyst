use tauri::Manager;

/// Prepare database connection pool
async fn prepare_db_connection_pool(
    handle: tauri::AppHandle,
) -> Result<sqlx::Pool<sqlx::Sqlite>, &'static str> {
    {
        let dir_path = match handle.app_handle().path_resolver().app_local_data_dir() {
            Some(dir) => dir.join("database"),
            None => return Err("Cannot get app local data directory"),
        };
        let file_path = dir_path.join("db.sqlite3");
        if !file_path.exists() {
            let _ = std::fs::create_dir_all(dir_path.clone());
            let _ = std::fs::File::create(file_path.clone());
        }

        match opener::open(&dir_path) {
            Ok(_) => {}
            Err(_) => return Err("Cannot open database directory"),
        };

        let file_path_str = match file_path.to_str() {
            Some(path) => path,
            None => return Err("Cannot convert db file path to string"),
        };

        let pool = sqlx::sqlite::SqlitePoolOptions::new().connect(file_path_str);
        match pool.await {
            Ok(conn) => Ok(conn),
            Err(_) => Err("Cannot connect to database"),
        }
    }
}

/// Prepare database and run migrations
///
/// This function prepares the database connection pool and runs the migrations.
pub async fn prepare_db(app: &tauri::App) -> Result<sqlx::pool::Pool<sqlx::Sqlite>, &'static str> {
    let db = prepare_db_connection_pool(app.handle()).await?;

    let migrations_dir = match app
        .app_handle()
        .path_resolver()
        .resolve_resource("resources/migrations/")
    {
        Some(dir) => dir,
        None => return Err("Cannot resolve migrations directory"),
    };

    let migrator = match sqlx::migrate::Migrator::new(migrations_dir).await {
        Ok(migrator) => migrator,
        Err(_) => return Err("Cannot build migrator"),
    };

    match migrator.run(&db).await {
        Ok(_) => Ok(db),
        Err(err) => {
            dbg!(err);
            Err("Cannot run migrator")
        }
    }
}
