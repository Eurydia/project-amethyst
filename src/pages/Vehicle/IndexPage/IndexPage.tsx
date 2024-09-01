import { BaseSortableTable } from "$components/BaseSortableTable";
import { MultiSelect } from "$components/MultiSelect";
import { TableHeaderDefinition } from "$types/generics";
import { Stack, Typography } from "@mui/material";
import { filterItems } from "core/filter";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

const HEADER_DEFINITION: TableHeaderDefinition<
	IndexPageLoaderData["entries"][number]
>[] = [
	{
		label: "ทะเบียนรถ",
		compare: null,
		render: ({ id, licensePlate }) => (
			<Typography
				component={Link}
				to={"/vehicles/info/" + id}
			>
				{licensePlate}
			</Typography>
		),
	},
	{
		label: "สายรถ",
		compare: null,
		render: (item) =>
			item.routes.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack spacing={1}>
					{item.routes.map(
						({ id, name }, index) => (
							<Typography
								key={"route" + index}
								component={Link}
								to={"/pickup-routes/info/" + id}
							>
								{name}
							</Typography>
						),
					)}
				</Stack>
			),
	},
	{
		label: "คนขับรถ",
		compare: null,
		render: ({ drivers }) =>
			drivers.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack spacing={1}>
					{drivers.map(
						({ id, name, surname }, index) => (
							<Typography
								key={"driver" + index}
								component={Link}
								to={"/drivers/info/" + id}
							>
								{name} {surname}
							</Typography>
						),
					)}
				</Stack>
			),
	},

	// {
	// 	label: "หจก.",
	// 	compare: (a, b) =>
	// 		a.vendor.localeCompare(b.vendor),
	// 	render: (item) => (
	// 		<Typography
	// 			sx={{
	// 				wordBreak: "break-word",
	// 				whiteSpace: "wrap",
	// 			}}
	// 		>
	// 			{item.vendor}
	// 		</Typography>
	// 	),
	// },
	// {
	// 	label: "จังหวัด",
	// 	compare: (a, b) =>
	// 		a.registeredCity.localeCompare(
	// 			b.registeredCity,
	// 		),
	// 	render: (item) => (
	// 		<Typography>
	// 			{item.registeredCity}
	// 		</Typography>
	// 	),
	// },
];

type CustomTableProps = {
	entries: IndexPageLoaderData["entries"];
};
const CustomTable: FC<CustomTableProps> = (
	props,
) => {
	const { entries } = props;
	const submit = useSubmit();

	const vehicleOptions = useMemo(() => {
		const vehicles: Record<string, string> = {};

		for (const entry of entries) {
			vehicles[entry.id] = entry.licensePlate;
		}

		const vehicleOptions = Object.entries(
			vehicles,
		).map(([value, label]) => ({
			value,
			label,
		}));

		return vehicleOptions;
	}, [entries]);

	const [search, setSearch] = useState("");
	const [selectedVehicles, setSelectedVehicles] =
		useState(
			vehicleOptions.map(({ value }) => value),
		);

	const filteredEntries = useMemo(() => {
		const vehicleSet = new Set(selectedVehicles);

		return entries.filter(({ id }) =>
			vehicleSet.has(id),
		);
	}, [entries, selectedVehicles]);

	const searchedEntries = useMemo(() => {
		const tokens = search
			.normalize()
			.split(" ")
			.map((token) => token.trim())
			.filter((token) => token.length > 0);
		return filterItems(filteredEntries, tokens, [
			"vendor",
			"registeredCity",
			"licensePlate",
			"drivers.*.name",
			"drivers.*.surname",
			"routes.*.name",
		]);
	}, [filteredEntries, search]);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ทะเบียนรถ",
			value: (
				<MultiSelect
					onChange={setSelectedVehicles}
					options={vehicleOptions}
					selectedOptions={selectedVehicles}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			headers={HEADER_DEFINITION}
			defaultSortOrder="asc"
			defaultSortByColumn={0}
			entries={searchedEntries}
			slotProps={{
				searchField: {
					placeholder:
						"ค้นหาด้วยทะเบียนรถ, สายรถ, หรือชื่อนามสกุลคนขับรถ",
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					children: "ลงทะเบียนรถ",
					onClick: () =>
						submit(
							{},
							{
								action: "/vehicles/new",
							},
						),
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				รายชื่อทะเบียนรถ
			</Typography>
			<CustomTable entries={entries} />
		</Stack>
	);
};
