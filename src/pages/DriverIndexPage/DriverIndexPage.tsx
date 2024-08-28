import { SortableTable } from "$components/SortableTable";
import { TypographyAlert } from "$components/TypographyAlert";
import { TypographyButton } from "$components/TypographyButton";
import { TableHeaderDefinition } from "$types/generics";
import {
	AddRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
	InputAdornment,
	Stack,
	TableContainer,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { filterItems } from "core/filter";
import { FC, useMemo, useState } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
	DriverIndexPageLoaderData,
	PreparedDriverData,
} from "./loader";

const HEADER_DEFINITION: TableHeaderDefinition<PreparedDriverData>[] =
	[
		{
			key: "license_plate",
			label: "ทะเบียนรถ",
			compare: null,
			render: (item) =>
				item.license_plate === "" ? (
					<Typography>ไม่มี</Typography>
				) : (
					<Typography
						component={Link}
						to={"/vehicles/id/" + item.id}
					>
						{item.license_plate}
					</Typography>
				),
		},
		{
			key: "name",
			label: "ชื่อและนามสกุล",
			compare: (a, b) =>
				a.name.localeCompare(b.name),
			render: (item) => (
				<Typography
					component={Link}
					to={"/drivers/info/" + item.id}
				>
					{item.name} {item.surname}
				</Typography>
			),
		},
		{
			key: "contact",
			label: "เบอร์ติดต่อ",
			compare: null,
			render: (item) => (
				<Typography
					sx={{
						textDecorationStyle: "wavy",
						textDecorationLine: "underline",
						textDecorationThickness: "from-font",
						cursor: "pointer",
					}}
					onClick={() => {
						navigator.clipboard.writeText(
							item.contact,
						);
						toast.info("คัดลอกเบอร์ติดต่อแล้ว");
					}}
				>
					{item.contact}
				</Typography>
			),
		},
	];

type CustomDataTableProps = {
	rows: PreparedDriverData[];
};
const CustomDataTable: FC<
	CustomDataTableProps
> = (props) => {
	const { rows } = props;
	const [search, setSearch] = useState("");

	const filteredRows = useMemo(() => {
		return filterItems(
			rows,
			search
				.split(" ")
				.map((s) => s.trim())
				.filter((s) => s !== ""),
			[
				"name",
				"surname",
				"contact",
				"license_plate",
			],
		);
	}, [rows, search]);

	return (
		<TableContainer>
			<Toolbar
				variant="dense"
				disableGutters
			>
				<TextField
					fullWidth
					placeholder="ค้นหาคนขับรถ"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchRounded />
							</InputAdornment>
						),
					}}
					value={search}
					onChange={(e) =>
						setSearch(e.target.value)
					}
				/>
			</Toolbar>
			<SortableTable
				headers={HEADER_DEFINITION}
				defaultSortOrder="asc"
				defaultSortBy="name"
				rows={filteredRows}
			/>
		</TableContainer>
	);
};

export const DriverIndexPage: FC = () => {
	const { driverData } =
		useLoaderData() as DriverIndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				รายชื่อคนขับรถ
			</Typography>
			<TypographyAlert severity="info">
				TBA
			</TypographyAlert>
			<Toolbar
				disableGutters
				variant="dense"
			>
				<TypographyButton
					variant="contained"
					startIcon={<AddRounded />}
					onClick={() =>
						submit(
							{},
							{
								action: "/drivers/new",
							},
						)
					}
				>
					ลงทะเบียนคนขับรถ
				</TypographyButton>
			</Toolbar>
			<CustomDataTable rows={driverData} />
		</Stack>
	);
};
