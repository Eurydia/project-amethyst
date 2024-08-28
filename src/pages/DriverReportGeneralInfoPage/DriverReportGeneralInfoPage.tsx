import { TypographyAlert } from "$components/TypographyAlert";
import { TypographyButton } from "$components/TypographyButton";
import { EditRounded } from "@mui/icons-material";
import {
	Box,
	Grid,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import {
	Link,
	useLoaderData,
} from "react-router-dom";
import { DriverReportGeneralInfoPageLoaderData } from "./loader";
import dayjs from "dayjs";
import "dayjs/locale/th";

export const DriverReportGeneralInfoPage: FC =
	() => {
		const { driver, entry } =
			useLoaderData() as DriverReportGeneralInfoPageLoaderData;

		const infoItems: {
			label: string;
			value: ReactNode;
		}[] = [
			{
				label: "ร้องเรียนเมื่อ",
				value: dayjs(entry.datetime_iso)
					.locale("th")
					.format(
						"HH:mm น. วันdddที่ DD MMMM YYYY",
					),
			},
			{
				label: "ผู้ที่ถูกร้องเรียน",
				value: (
					<Link to={"/drivers/info/" + driver.id}>
						{driver.name} {driver.surname}
					</Link>
				),
			},
			{
				label: "เรื่อง",
				value: entry.title,
			},
			{
				label: "รายละเอียด",
				value: entry.content,
			},
			{
				label: "หัวข้อที่เกี่ยวข้อง",
				value: entry.topics.replaceAll(",", ", "),
			},
		];

		const renderedInfoItems = infoItems.map(
			(item, index) => (
				<Fragment key={"info" + index}>
					<Grid
						item
						xs={12}
						md={3}
					>
						<Typography fontWeight="bold">
							{item.label}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
					>
						<Typography>{item.value}</Typography>
					</Grid>
				</Fragment>
			),
		);

		return (
			<Stack spacing={1}>
				<Typography variant="h1">
					ข้อมูลการร้องเรียนคนขับรถ
				</Typography>
				<TypographyAlert severity="info">
					TBA
				</TypographyAlert>
				<Toolbar
					variant="dense"
					disableGutters
				>
					<TypographyButton
						startIcon={<EditRounded />}
						variant="outlined"
					>
						แก้ไขข้อมูล
					</TypographyButton>
				</Toolbar>
				<Box width="75%">
					<Grid
						container
						spacing={2}
					>
						{renderedInfoItems}
					</Grid>
				</Box>
			</Stack>
		);
	};
