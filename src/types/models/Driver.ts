export type DriverModel = {
	id: string;

	name: string;
	surname: string;
	contact: string;
	license_type: "ท.1" | "ท.2";
	images: string; // Commas separated image paths
};

export type DriverReportModel = {
	id: string;
	driver_id: string;

	datetime: string;
	title: string;
	content: string;
	topics: string;
};

export type DriverReport = {
	id: string;
	driver_id: string;
	driver_name: string;
	driver_surname: string;

	datetime: string;
	title: string;
	content: string;
	topics: string[];
};

export type DriverFormData = Omit<
	DriverModel,
	"id" | "images"
>;

export type DriverReportFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	driver: DriverModel | null;
};
