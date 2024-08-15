import {
	Stack,
	Card,
	CardHeader,
	CardActionArea,
	Typography,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Toolbar,
	List,
	ListItem,
	ListItemText,
	TextField,
	Box,
	InputAdornment,
	Tooltip,
} from "@mui/material";
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
import { filterItems } from "../../core/filter";
import {
	AddRounded,
	FlagRounded,
	SearchRounded,
	TurnSlightRightRounded,
} from "@mui/icons-material";
import {
	DriverIndexPageLoaderData,
	PreparedDriverData,
} from "./loader";
import { SortableTable } from "$components/SortableTable";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models";
import { toast } from "react-toastify";

const HEADER_DEFINITION: TableHeaderDefinition<PreparedDriverData>[] =
	[
		{
			key: "license_plate",
			label: "ทะเบียนรถ",
			compare: (_) => 0,
			render: (item) => (
				<Typography>
					{item.license_plate === "" ? (
						"-"
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
				<Link to={"/drivers/id/" + item.id}>
					<Typography>{item.name}</Typography>
				</Link>
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
			compare: (_) => 0,
			render: (item) => (
				<Typography
					sx={{
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
					เพิ่มคนขับรถ
				</Button>
				<Button
					startIcon={<FlagRounded />}
					disableElevation
					variant="outlined"
					onClick={() =>
						submit(
							{},
							{
								action: "/records/driver/draft",
							},
						)
					}
				>
					รายงานปัญหาคนขับรถ
				</Button>
			</Stack>
			<TextField
				fullWidth
				placeholder="ค้นหา"
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
					defaultOrder="asc"
					defaultOrderBy="name"
					rows={searchedRoutes}
				/>
			</TableContainer>
		</Stack>
	);
};
