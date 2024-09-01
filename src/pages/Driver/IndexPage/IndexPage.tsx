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
			<Typography key={"driver" + item.id}>
				<Link to={"/drivers/info/" + item.id}>
					{item.name} {item.surname}
				</Link>
			</Typography>
		),
	},
	{
		label: "สายรถประจำ",
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
						<Typography key={"vehicle" + index}>
							<Link
								to={
									"/pickup-routes/info/" +
									route.id
								}
							>
								{route.name}
							</Link>
						</Typography>
					))}
				</Stack>
			),
	},
	{
		label: "ทะเบียนรถประจำ",
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
						<Typography key={"vehicle" + index}>
							<Link
								to={
									"/vehicles/info/" + vehicle.id
								}
							>
								{vehicle.licensePlate}
							</Link>
						</Typography>
					))}
				</Stack>
			),
	},
];

const extractOptions = (
	entries: IndexPageLoaderData["entries"],
) => {
	const uniqueOption: Record<string, string> = {};
	for (const entry of entries) {
		uniqueOption[
			entry.id
		] = `${entry.name} ${entry.surname}`;
	}
	return Object.entries(uniqueOption).map(
		([value, label]) => ({
			value,
			label,
		}),
	);
};

const searchEntries = (
	entries: IndexPageLoaderData["entries"],
	search: string,
) => {
	return filterItems(entries, search, [
		"name",
		"surname",
		"vehicles.*.licensePlate",
		"routes.*.name",
	]);
};

const filterEntries = (
	drivers: string[],
	entries: IndexPageLoaderData["entries"],
) => {
	const driverSet = new Set(drivers);
	return entries.filter((entry) =>
		driverSet.has(entry.id),
	);
};

type CustomTableProps = {
	entries: IndexPageLoaderData["entries"];
};
export const CustomTable: FC<CustomTableProps> = (
	props,
) => {
	const { entries } = props;

	const submit = useSubmit();

	const driverOptions = useMemo(
		() => extractOptions(entries),
		[entries],
	);

	const [search, setSearch] = useState("");
	const [drivers, setDrivers] = useState(
		driverOptions.map(({ value }) => value),
	);

	const filteredEntries = useMemo(
		() => filterEntries(drivers, entries),
		[entries, drivers],
	);

	const searchedEntries = useMemo(
		() => searchEntries(filteredEntries, search),
		[filteredEntries, search],
	);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "คนขับรถ",
			value: (
				<MultiSelect
					onChange={setDrivers}
					options={driverOptions}
					selectedOptions={drivers}
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
						"ค้นหาด้วยชื่อ, นามสกุล, เลขทะเบียนรถ หรือสายรถ",
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
