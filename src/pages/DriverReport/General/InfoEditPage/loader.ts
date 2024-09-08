import {
	getDriver,
	getDriverReportGeneral,
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

export type InfoEditPageLoaderData = {
	reportId: number;
	topicComboBoxOptions: string[];
	driver: DriverModel;
	initFormData: DriverReportFormData;
};
export const infoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.driverReportIdIsMissingFromParams,
				},
			);
		}
		const reportId = Number.parseInt(
			params.reportId,
		);
		const report = await getDriverReportGeneral(
			reportId,
		);
		if (report === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.driverGeneralReportIsMissingFromDatabase,
				},
			);
		}
		const driver = await getDriver(
			report.driver_id,
		);
		if (driver === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.driverIsMissingFromDatabase,
				},
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
		const loaderData: InfoEditPageLoaderData = {
			reportId,
			driver,
			topicComboBoxOptions,
			initFormData,
		};
		return loaderData;
	};
