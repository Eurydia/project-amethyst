import { json } from "react-router-dom";

export const BadRequestError = () =>
  json(
    {},
    {
      status: 400,
      statusText: "ข้อมูลไม่ครบถ้วน",
    }
  );

export const DriverMissingFromDatabaseError = () =>
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบคนขับรถในฐานข้อมูล",
    }
  );

export const DriverReportGeneralMissingFromDatabaseError =
  () =>
    json(
      {},
      {
        status: 404,
        statusText:
          "ไม่พบเรื่องร้องเรียนคนขับรถในฐานข้อมูล",
      }
    );

export const DriverReportMedicalMissingFromDatabaseError =
  () =>
    json(
      {},
      {
        status: 404,
        statusText: "ไม่พบผลการตรวจสารเสพติดในฐานข้อมูล",
      }
    );

export const PickupRouteMissingFromDatabaseError = () =>
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบสายรถในฐานข้อมูล",
    }
  );

export const PickupRouteReportGeneralMissingFromDatabaseError =
  () =>
    json(
      {},
      {
        status: 404,
        statusText: "ไม่พบเรื่องร้องเรียนสายรถในฐานข้อมูล",
      }
    );

export const VehicleMissingFromDatabaseError = () =>
  json(
    {},
    {
      status: 404,
      statusText: "ไม่พบรถรับส่งในฐานข้อมูล",
    }
  );

export const VehicleReportGeneralMissingFromDatabaseError =
  () =>
    json(
      {},
      {
        status: 404,
        statusText:
          "ไม่พบเรื่องร้องเรียนรถรับส่งในฐานข้อมูล",
      }
    );

export const VehicleReportInspectionMissingFromDatabaseError =
  () =>
    json(
      {},
      {
        status: 404,
        statusText: "ไม่พบผลการตรวจสภาพรถในฐานข้อมูล",
      }
    );
