import { TypographyAlert } from "$components/TypographyAlert";
import { TypographyButton } from "$components/TypographyButton";
import { EditRounded } from "@mui/icons-material";
import {
	alpha,
	Grid,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { FC, ReactNode } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { DriverReportGeneralInfoPageLoaderData } from "./loader";

export const DriverReportGeneralInfoPage: FC =
	() => {
		const { driver, entry } =
			useLoaderData() as DriverReportGeneralInfoPageLoaderData;
		const submit = useSubmit();
		const infoItems: {
			label: string;
			value: ReactNode;
		}[] = [
			{
				label: "ร้องเรียนเมื่อ",
				value: dayjs(entry.datetime)
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
				<Grid
					key={"info" + index}
					item
					container
					paddingY={2}
					sx={{
						backgroundColor: (theme) =>
							alpha(
								index % 2 === 0
									? theme.palette.primary.main
									: theme.palette.common.white,
								0.05,
							),
					}}
				>
					<Grid
						item
						xs={12}
						md={3}
						display="flex"
						alignItems="center"
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
				</Grid>
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
						onClick={() =>
							submit({}, { action: "./edit" })
						}
					>
						แก้ไขข้อมูล
					</TypographyButton>
				</Toolbar>
				<Grid container>{renderedInfoItems}</Grid>
			</Stack>
		);
	};
