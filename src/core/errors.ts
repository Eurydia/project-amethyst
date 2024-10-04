import { json } from "react-router-dom";

export const BAD_REQUEST_ERROR = json(
  {},
  {
    status: 400,
    statusText: "ข้อมูลไม่ครบถ้วน",
  }
);

export const DRIVER_MISSING_FROM_DATABASE_ERROR = json(
  {},
  {
    status: 404,
    statusText: "ไม่พบคนขับรถในฐานข้อมูล",
  }
);

export const DRIVER_REPORT_GENERAL_MISSING_FROM_DATABASE_ERROR =
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบเรื่องร้องเรียนคนขับรถในฐานข้อมูล",
    }
  );

export const DRIVER_REPORT_MEDICAL_MISSING_FROM_DATABASE =
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบผลการตรวจสารเสพติดในฐานข้อมูล",
    }
  );

export const PICKUP_ROUTE_MISSING_FROM_DATABASE_ERROR =
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบสายรถในฐานข้อมูล",
    }
  );

export const PICKUP_ROUTE_REPORT_GENERAL_MISSING_FROM_DATA_ERROR =
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบเรื่องร้องเรียนสายรถในฐานข้อมูล",
    }
  );

export const VEHICLE_MISSING_FROM_DATABASE_ERROR = json(
  {},
  {
    status: 404,
    statusText: "ไม่พบรถรับส่งในฐานข้อมูล",
  }
);

export const VEHICLE_REPORT_GENERAL_MISSING_FROM_DATABASE_ERROR =
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบเรื่องร้องเรียนรถรับส่งในฐานข้อมูล",
    }
  );

export const VEHICLE_REPORT_INSPECTION_MISSING_FROM_DATABASE_ERROR =
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบผลการตรวจสภาพรถในฐานข้อมูล",
    }
  );
