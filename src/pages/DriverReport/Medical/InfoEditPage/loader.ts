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
	topicOptions: string[];
	driverOptions: DriverModel[];
	reportId: string;
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
		const loaderData: InfoPageLoaderData = {
			driverOptions,
			topicOptions,
			initFormData,
			reportId,
		};
		return loaderData;
	};
