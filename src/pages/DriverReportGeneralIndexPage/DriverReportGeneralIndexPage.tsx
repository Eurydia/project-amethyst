import { DriverReportGeneralButton } from "$components/DriverReportGeneralButton";
import { DriverReportTable } from "$components/DriverReportTable";
import { DriverReport } from "$types/form-data";
import { TableHeaderDefinition } from "$types/generics";
import {
	Alert,
	Checkbox,
	Collapse,
	Container,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	TableContainer,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import {
	Link,
	useLoaderData,
} from "react-router-dom";
import { DriverReportGeneralIndexPageLoaderData } from "./loader";
import { TypographyAlert } from "$components/TypographyAlert";
import { SortableTable } from "$components/SortableTable";
import { filterItems } from "$core/filter";
import { SearchRounded } from "@mui/icons-material";

const TABLE_HEADERS: TableHeaderDefinition<DriverReport>[] =
	[
		{
			key: "datetime_iso",
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime_iso).unix() -
				dayjs(b.datetime_iso).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime_iso)
						.locale("th")
						.format("HH:mm น. DD/MM/YYYY")}
				</Typography>
			),
		},
		{
			key: "driver_name",
			label: "ชื่อ-นามสกุล",
			compare: (a, b) =>
				a.driver_name.localeCompare(
					b.driver_name,
				),
			render: (item) => (
				<Typography>
					{item.driver_name} {item.driver_surname}
				</Typography>
			),
		},
		{
			key: "title",
			label: "เรื่อง",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={"./info/" + item.id}
				>
					{item.title}
				</Typography>
			),
		},
		{
			key: "topics",
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) => (
				<Typography>
					{item.topics.join(", ")}
				</Typography>
			),
		},
	];

type CustomListProps = {
	options: string[];
	selectedOptions: string[];
	toggleHandler: (option: string) => () => void;
};
const CustomList: FC<CustomListProps> = (
	props,
) => {
	const {
		options,
		selectedOptions,
		toggleHandler,
	} = props;

	const renderedOptions = options.map(
		(option, index) => {
			const onToggle = toggleHandler(option);
			const isChecked =
				selectedOptions.includes(option);

			return (
				<ListItem
					key={"option" + index}
					disableGutters
					disablePadding
					sx={{
						display: "inline",
						width: "auto",
					}}
				>
					<ListItemButton
						disableRipple
						onClick={onToggle}
					>
						<ListItemIcon>
							<Checkbox
								disableRipple
								checked={isChecked}
							/>
						</ListItemIcon>
						<ListItemText>
							<Typography>{option}</Typography>
						</ListItemText>
					</ListItemButton>
				</ListItem>
			);
		},
	);

	return (
		<List
			dense
			disablePadding
			sx={{
				maxHeight: 200,
				overflow: "auto",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				gap: 1,
			}}
		>
			{renderedOptions}
		</List>
	);
};

export const DriverReportGeneralIndexPage: FC =
	() => {
		const { entries, drivers } =
			useLoaderData() as DriverReportGeneralIndexPageLoaderData;

		const [search, setSearch] = useState("");
		const [filterOpen, setFilterOpen] =
			useState(false);
		const [selectedDrivers, setSelectedDrivers] =
			useState<string[]>(drivers);

		const filteredEntries = useMemo(() => {
			const tokens = search
				.trim()
				.normalize()
				.split(" ")
				.map((token) => token.trim())
				.filter((token) => token.length > 0);

			const fromSelected = entries.filter(
				(entry) =>
					selectedDrivers.includes(
						`${entry.driver_name} ${entry.driver_surname}`.normalize(),
					),
			);

			return filterItems(fromSelected, tokens, [
				"title",
				"topics",
				"driver_name",
				"driver_surname",
			]);
		}, [search, entries, selectedDrivers]);

		return (
			<Stack spacing={2}>
				<Typography variant="h1">
					ตารางบันทึกการร้องเรียนคนขับรถ
				</Typography>
				<TypographyAlert severity="info">
					TBA
				</TypographyAlert>
				<Toolbar
					disableGutters
					variant="dense"
				>
					<DriverReportGeneralButton
						path="./new"
						variant="contained"
					/>
				</Toolbar>
				<Toolbar
					disableGutters
					variant="dense"
					sx={{
						flexDirection: "column",
						gap: 1,
						flexWrap: "wrap",
					}}
				>
					<TextField
						fullWidth
						placeholder="ค้นหาประวัติการร้องเรียน"
						value={search}
						onChange={(e) =>
							setSearch(e.target.value)
						}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchRounded />
								</InputAdornment>
							),
						}}
					/>
					<CustomList
						options={drivers}
						selectedOptions={selectedDrivers}
						toggleHandler={(option) => () => {
							if (
								!selectedDrivers.includes(option)
							) {
								setSelectedDrivers([
									...selectedDrivers,
									option,
								]);
								return;
							}
							setSelectedDrivers(
								selectedDrivers.filter(
									(driver) => driver !== option,
								),
							);
						}}
					/>
				</Toolbar>
				<TableContainer>
					<SortableTable
						rows={filteredEntries}
						headers={TABLE_HEADERS}
						defaultOrderBy="datetime_iso"
						defaultSortOrder="asc"
					/>
				</TableContainer>
			</Stack>
		);
	};
