import { SortableTable } from "$components/SortableTable";
import { StyledTextWavy } from "$components/StyledTextWavy";
import { TableHeaderDefinition } from "$types/generics";
import {
	AddRounded,
	EditRounded,
	FlagRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
	Alert,
	AlertTitle,
	Button,
	Collapse,
	InputAdornment,
	Stack,
	TableContainer,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { filterItems } from "core/filter";
import {
	FC,
	SyntheticEvent,
	useState,
} from "react";
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
			render: (item) => (
				<Typography>
					{item.license_plate === "" ? (
						"ไม่มี"
					) : (
						<Link to={"/vehicles/id/" + item.id}>
							{item.license_plate}
						</Link>
					)}
				</Typography>
			),
		},
		{
			key: "name",
			label: "ชื่อ",
			compare: (a, b) =>
				a.name.localeCompare(b.name),
			render: (item) => (
				<Typography>
					<Link to={"/drivers/info/" + item.id}>
						{item.name}
					</Link>
				</Typography>
			),
		},
		{
			key: "surname",
			label: "นามสกุล",
			compare: (a, b) =>
				a.surname.localeCompare(b.surname),
			render: (item) => (
				<Typography>{item.surname}</Typography>
			),
		},
		{
			key: "contact",
			label: "เบอร์ติดต่อ",
			compare: null,
			render: (item) => (
				<StyledTextWavy
					onClick={() => {
						navigator.clipboard.writeText(
							item.contact,
						);
						toast.info("คัดลอกเบอร์ติดต่อแล้ว");
					}}
				>
					{item.contact}
				</StyledTextWavy>
			),
		},
	];

type TableToolbarProps = {
	search: string;
	onSearchChange: (search: string) => void;
};
const TableToolbar: FC<TableToolbarProps> = (
	props,
) => {
	const { search, onSearchChange } = props;
	const submit = useSubmit();
	const handleSearchChange = (
		e: SyntheticEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		onSearchChange(e.currentTarget.value);
	};

	return (
		<Toolbar
			disableGutters
			variant="dense"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: 1,
			}}
		>
			<Stack
				useFlexGap
				direction="row"
				spacing={1}
				flexWrap="wrap"
			>
				<Button
					disableElevation
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
				</Button>
				<Button
					startIcon={<EditRounded />}
					disableElevation
					disableRipple
					variant="outlined"
					onClick={() =>
						submit(
							{},
							{
								action:
									"/drivers/report/medical/new",
							},
						)
					}
				>
					บันทึกผลการตรวจสารเสพติด
				</Button>
				<Button
					disableElevation
					variant="outlined"
					startIcon={<FlagRounded />}
					onClick={() =>
						submit(
							{},
							{
								action:
									"/drivers/report/general/new",
							},
						)
					}
				>
					รายงานปัญหาคนขับรถ
				</Button>
			</Stack>
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
				onChange={handleSearchChange}
			/>
		</Toolbar>
	);
};

export const DriverIndexPage: FC = () => {
	const { driverData } =
		useLoaderData() as DriverIndexPageLoaderData;
	const [search, setSearch] = useState("");

	const searchedRoutes = filterItems(
		driverData,
		search.split(" "),
		[
			"name",
			"surname",
			"contact",
			"license_plate",
		],
	);

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				รายชื่อคนขับรถ
			</Typography>
			<TableContainer>
				<TableToolbar
					search={search}
					onSearchChange={setSearch}
				/>
				<SortableTable
					headers={HEADER_DEFINITION}
					defaultSortOrder="asc"
					defaultOrderBy="name"
					rows={searchedRoutes}
				/>
			</TableContainer>
		</Stack>
	);
};
