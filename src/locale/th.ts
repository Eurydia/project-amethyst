import { postDriver } from "$backend/database/post";
import { DriverModel } from "$types/models/Driver";

export const TRANSLATION = {
	gallery: "คลังภาพ",
	postReportSuccess: "ลงบันทึกสำเร็จ",
	postReportFail: "ลงบันทึกล้มเหลว",

	postSuccess: "ลงทะเบียนสำเร็จ",
	postFail: "ลงทะเบียนล้มเหลว",

	putSuccess: "แก้ไขสำเร็จ",
	putFail: "แก้ไขล้มเหลว",

	operationalLogTable:
		"ตารางบันทึกประวัติการเดินรถ",

	paramsIsMissingDriverId:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing driverId in params)",
	driverIsMissingFromDatabase:
		"ไม่พบข้อมูลคนขับที่ต้องการฐานข้อมูล (Cannot find driver with given ID)",

	driverGeneralReportTable:
		"ตารางเรื่องร้องเรียนคนขับรถ",
	driverMedicalReportTable:
		"ตารางผลการตรวจสารเสพติด",
	postDriverGeneralReport:
		"ลงบันทึกเรื่องร้องเรียนคนขับรถ",
	postDriverMedicalReport:
		"ลงบันทึกผลการตรวจสารเสพติด",
	searchDriverGeneralReport:
		"ค้นหาเรื่องร้องเรียนคนขับรถ",
	searchDriverMedicalReport:
		"ค้นหาผลการตรวจสารเสพติด",
	postDriver: "ลงทะเบียนคนขับรถ",
	driverTable: "รายชื่อคนขับรถ",
	driverInfo: `ข้อมูลของคนขับรถ`,
	driverNameAndSurname: "ชื่อและนามสกุล",
	driverContact: "เบอร์ติดต่อ",
	driverLicenseType: "ประเภทใบขับขี่",

	infoOf: (label: string) =>
		`ข้อมูลของ "${label}"`,
	editInfoOf: (label: string) =>
		`แก้ไขข้อมูลของ "${label}"`,
};
