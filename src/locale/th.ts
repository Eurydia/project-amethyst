export const TRANSLATION = {
	globalTopics: `หัวข้อที่เกี่ยวข้อง`,
	globalContent: `รายละเอียด`,
	globalDatetimePosted: `วันที่ลงบันทึก`,
	globalTitle: `เรื่อง`,

	globalCancel: `ยกเลิก`,
	globalPost: `ลงทะเบียน`,
	globalTOC: `สารบัญ`,
	globalSelectAll: `เลือกทั้งหมด`,
	globalEditInfo: `แก้ไขข้อมูล`,
	globalSortAscending: "น้อยขึ้นไปมาก",
	globalSortDescending: "มากลงไปน้อย",
	globalNoEntryFoundInTable: `ไม่มีพบรายการในตาราง`,
	globalFoundXEntriesInTable: (x: number) =>
		`พบ ${x} รายการ`,
	globalAdvancedSearch: `ตัวกรองขั้นสูง`,

	pickupRouteGeneralReportIdIsMissingFromParams: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Params is missing "reportId")`,
	pickupRouteGeneralReportIsMissingFromDatabase: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องไม่พบเรื่องการร้องเรียนสายรถรับส่งที่ต้องการในฐานข้อมูล (Cannot find pickup route general report with given ID in database)`,

	pickupRouteIdIsMissingFromParams: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Params is missing "routeId")`,

	pickupRouteIsMissingFromDatabase: `ไม่พบข้อมูลสายรถรับส่งที่ต้องการในฐานข้อมูล (Cannot find pickup route with given ID in database)`,

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
	vehicleIdIsMissingFromParams: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Params is missing "vehicleId")`,
	vehicleInspectionReportIsMissingFromDatabase: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องไม่พบผลการตรวจสภาพรถที่ต้องการในฐานข้อมูล (Cannot find vehicle inspection report with given ID in database)`,
	vehicleGeneralReportIsMissingFromDatabase: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องไม่พบเรื่องร้องเรียนรถขนส่งที่ต้องการในฐานข้อมูล (Cannot find general vehicle report with given ID in database)`,
	vehicleReportIdIsMissingFromParams:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Params is missing reportId)",
	vehicleIsMissingFromDatabase: `ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องไม่พบข้อมูลรถรับส่งที่ต้องการในฐานข้อมูล (Cannot find vehicle with given ID in database)`,

	gallery: `คลังภาพ`,
	postReportSuccess: `ลงบันทึกสำเร็จ`,
	postReportFail: `ลงบันทึกล้มเหลว`,

	postSuccess: `ลงทะเบียนสำเร็จ`,
	postFail: `ลงทะเบียนล้มเหลว`,

	putSuccess: `แก้ไขสำเร็จ`,
	putFail: `แก้ไขล้มเหลว`,

	operationalLogTable:
		"ตารางบันทึกประวัติการเดินรถ",

	driverIdIsMissingFromParams:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing driverId in params)",
	driverReportIdIsMissingFromParams:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing reportId in params)",

	driverGeneralReportIsMissingFromDatabase:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบเรื่องร้องเรียนคนขับรถในฐานข้อมูล (Cannot find report with given ID)",
	driverMedicalReportIsMissingFromDatabase:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบผลการตรวจสารเสพติดในฐานข้อมูล (Cannot find report with given ID)",
	driverIsMissingFromDatabase:
		"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบข้อมูลคนขับรถที่ต้องการฐานข้อมูล (Cannot find driver with given ID)",

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
	driverName: "ชื่อ",
	driverSurname: "นามสกุล",
	driverNameAndSurname: "ชื่อและนามสกุล",
	driverContact: "เบอร์ติดต่อ",
	driverLicenseType: "ประเภทใบขับขี่",

	driverEditInfo: "แก้ไขข้อมูลคนขับรถ",
	infoOf: (label: string) =>
		`ข้อมูลของ "${label}"`,
	editInfoOf: (label: string) =>
		`แก้ไขข้อมูลของ "${label}"`,
};
