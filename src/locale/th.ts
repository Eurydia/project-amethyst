export const TRANSLATION = {
	pickupRouteIdIsMissingFromParams: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Params is missing "routeId")`,

	pickupRouteIsMissingFromDatabase: `ไม่พบข้อมูลสายรถรับส่งที่ต้องการในฐานข้อมูล (Cannot find pickup route with given ID in database),`,

	pickupRouteDetails: `ข้อมูลสายรถรับส่ง`,
	pickupRouteDetailsWithLabel: (label: string) =>
		`ข้อมูลสายรถรับส่ง "${label}"`,
	pickupRouteEditDetailsWithLabel: (
		label: string,
	) => `แก้ไขข้อมูลสายรถรับส่ง "${label}"`,
	pickupRouteGeneralReportTable: `ตารางบันทึกเรื่องร้องเรียนสายรถรับส่ง`,

	pickupRoutePostFormTitle: `ลงทะเบียนสายรถรับส่ง`,
	pickupRouteTableSearch: `ค้นหาด้วยสายรถ, ทะเบียนรถ, หรือชื่อนามสกุลคนขับรถ`,
	pickupRouteTable: `รายชื่อสายรถรับส่ง`,
	pickupRoute: `สายรถรับส่ง`,
	pickupRouteName: `ชื่อสายรถรับส่ง`,
	pickupRoutePost: `ลงทะเบียนสายรถรับส่ง`,
	arrivalTime: `เวลานำรถเข้า`,
	departureTime: `เวลานำรถออก`,

	vehicleLicensePlate: `เลขทะเบียนรถ`,

	gallery: `คลังภาพ`,
	postReportSuccess: `ลงบันทึกสำเร็จ`,
	postReportFail: `ลงบันทึกล้มเหลว`,

	postSuccess: `ลงทะเบียนสำเร็จ`,
	postFail: `ลงทะเบียนล้มเหลว`,

	putSuccess: `แก้ไขสำเร็จ`,
	putFail: `แก้ไขล้มเหลว`,

	operationalLogTable:
		"ตารางบันทึกประวัติการเดินรถ",

	paramsIsMissingDriverId:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing driverId in params)",
	driverIsMissingFromDatabase:
		"ไม่พบข้อมูลคนขับที่ต้องการฐานข้อมูล (Cannot find driver with given ID)",

	driver: "คนขับรถ",
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
