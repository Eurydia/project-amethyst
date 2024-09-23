/** @format */

import { PickupRouteModel } from "./pickup-route";

export type PickupRouteReportGeneralModel = {
  id: number;
  route_id: number;
  datetime: string;
  title: string;
  content: string;
  topics: string;
};

export type PickupRouteReportGeneralEntry = {
  datetime: string;
  routeName: string;
  routeId: number;
  id: number;
  title: string;
  topics: string[];
};

export type PickupRouteReportGeneralFormData = {
  route: PickupRouteModel;
  datetime: string;
  title: string;
  content: string;
  topics: string[];
};

export type PickupRouteReportGeneralExportData = {
  // TODO: rename properties
  ชื่อสายรถ: string;
  รหัสสายรถ: number;

  รหัสเรื่องร้องเรียน: number;
  วันที่ลงบันทึก: string;
  เรื่อง: string;
  รายละเอียด: string;
  หัวข้อที่เกี่ยวข้อง: string;
};
