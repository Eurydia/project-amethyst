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
	reportId: string;
	topicOptions: string[];
	driverOptions: DriverModel[];
	initFormData: DriverReportFormData;
};
export const infoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		const { reportId } = params;
		if (reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const report = await getDriverReportGeneral(
			reportId,
		);
		if (report === null) {
			throw json(
				{
					message:
						TRANSLATION.driverGeneralReportIsMissingFromDatabase,
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
						TRANSLATION.driverIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const driverOptions = [driver];
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
			driverOptions,
			topicOptions,
			initFormData,
		};
		return loaderData;
	};
