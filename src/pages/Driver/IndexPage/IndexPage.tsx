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
		label: "คนขับรถ",
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
		label: "สายรถ",
		compare: null,
		render: (item) =>
			item.routes.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack
					spacing={1}
					useFlexGap
				>
					{item.routes.map((route, index) => (
						<Typography
							key={"vehicle" + index}
							component={Link}
							to={
								"/pickup-routes/info/" + route.id
							}
						>
							{route.name}
						</Typography>
					))}
				</Stack>
			),
	},
	{
		label: "ทะเบียนรถ",
		compare: null,
		render: (item) =>
			item.vehicles.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack
					spacing={1}
					useFlexGap
				>
					{item.vehicles.map((vehicle, index) => (
						<Typography
							key={"vehicle" + index}
							component={Link}
							to={"/vehicles/info/" + vehicle.id}
						>
							{vehicle.licensePlate}
						</Typography>
					))}
				</Stack>
			),
	},
	{
		label: "เบอร์ติดต่อ",
		compare: null,
		render: (item) => (
			<Typography>{item.contact}</Typography>
		),
	},
];

type CustomTableProps = {
	entries: IndexPageLoaderData["entries"];
};
const CustomTable: FC<CustomTableProps> = (
	props,
) => {
	const { entries } = props;
	const submit = useSubmit();

	const driverOptions = useMemo(() => {
		const uniqueDrivers: Record<string, string> =
			{};

		for (const entry of entries) {
			uniqueDrivers[
				entry.id
			] = `${entry.name} ${entry.surname}`;
		}

		const driverOptions = Object.entries(
			uniqueDrivers,
		).map(([value, label]) => ({
			value,
			label,
		}));

		return driverOptions;
	}, [entries]);

	const [search, setSearch] = useState("");
	const [selectedDrivers, setSelectedDrivers] =
		useState(
			driverOptions.map(({ value }) => value),
		);

	const filteredEntries = useMemo(() => {
		const driverSet = new Set(selectedDrivers);

		return entries.filter((item) =>
			driverSet.has(item.id),
		);
	}, [entries, selectedDrivers]);

	const searchedEntries = useMemo(() => {
		const tokens = search
			.normalize()
			.split(" ")
			.map((token) => token.trim())
			.filter((token) => token.length > 0);
		return filterItems(filteredEntries, tokens, [
			"name",
			"surname",
			"contact",
			"vehicles.*.licensePlate",
			"routes.*.name",
		]);
	}, [filteredEntries, search]);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "คนขับรถ",
			value: (
				<MultiSelect
					onChange={setSelectedDrivers}
					options={driverOptions}
					selectedOptions={selectedDrivers}
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
						"ค้นหาด้วยชื่อ, นามสกุล, ทะเบียนรถ, สายรถ หรือเบอร์ติดต่อ",
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					children: "ลงทะเบียนคนขับรถ",
					onClick: () =>
						submit(
							{},
							{
								action: "/drivers/new",
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
				รายชื่อคนขับรถ
			</Typography>
			<CustomTable entries={entries} />
		</Stack>
	);
};
