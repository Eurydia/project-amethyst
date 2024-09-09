import {
	getDriver,
	getDriverReportMedical,
	getTopicAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	driver: DriverModel;
	reportId: number;
	topicComboBoxOptions: string[];
	initFormData: DriverReportFormData;
};
export const infoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const reportId = Number.parseInt(
			params.reportId,
		);
		const report = await getDriverReportMedical(
			reportId,
		);
		if (report === null) {
			throw json(
				{
					message:
						TRANSLATION.driverMedicalReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const driver = await getDriver(
			report.driver_id,
		);
		if (driver === null) {
			throw json(
				{
					message:
						TRANSLATION.errorDriverIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const topicComboBoxOptions =
			await getTopicAll();

		const initFormData: DriverReportFormData = {
			content: report.content,
			datetime: report.datetime,
			title: report.title,
			topics: report.topics
				.normalize()
				.split(",")
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),

			driver,
		};
		const loaderData: InfoPageLoaderData = {
			driver,
			topicComboBoxOptions,
			initFormData,
			reportId,
		};
		return loaderData;
	};
