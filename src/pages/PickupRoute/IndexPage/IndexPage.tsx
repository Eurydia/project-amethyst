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
		label: "สายรถ",
		compare: null,
		render: (item) => (
			<Typography
				component={Link}
				to={"/pickup-routes/info/" + item.id}
			>
				{item.name}
			</Typography>
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
					{item.vehicles.map(
						({ id, plate }, index) => (
							<Typography
								key={"vehicle" + index}
								component={Link}
								to={"/vehicles/info/" + id}
							>
								{plate}
							</Typography>
						),
					)}
				</Stack>
			),
	},

	{
		label: "คนขับรถ",
		compare: null,
		render: (item) =>
			item.drivers.length === 0 ? (
				<Typography>ไม่มี</Typography>
			) : (
				<Stack
					spacing={1}
					useFlexGap
				>
					{item.drivers.map(
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
];

type CustomTableProps = {
	entries: IndexPageLoaderData["entries"];
};
const CustomTable: FC<CustomTableProps> = (
	props,
) => {
	const { entries } = props;
	const submit = useSubmit();

	const routeOptions = useMemo(() => {
		const uniqueRoutes: Record<string, string> =
			{};

		for (const entry of entries) {
			uniqueRoutes[entry.id] = entry.name;
		}

		const routeOptions = Object.entries(
			uniqueRoutes,
		).map(([value, label]) => ({
			label,
			value,
		}));

		return routeOptions;
	}, [entries]);

	const [search, setSearch] = useState("");
	const [selectedRoutes, setSelectedRoutes] =
		useState(
			routeOptions.map(({ value }) => value),
		);
	const filteredEntries = useMemo(() => {
		const routeSet = new Set(selectedRoutes);
		return entries.filter((item) =>
			routeSet.has(item.id),
		);
	}, [entries, selectedRoutes]);

	const searchedEntries = useMemo(() => {
		const tokens = search
			.normalize()
			.split(" ")
			.map((token) => token.trim())
			.filter((token) => token.length > 0);
		return filterItems(filteredEntries, tokens, [
			"name",
			"vehicles.*.plate",
			"drivers.*.name",
			"drivers.*.surname",
		]);
	}, [filteredEntries, search]);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "สายรถ",
			value: (
				<MultiSelect
					onChange={setSelectedRoutes}
					options={routeOptions}
					selectedOptions={selectedRoutes}
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
						"ค้นหาด้วยสายรถ, ทะเบียนรถ, หรือชื่อนามสกุลคนขับรถ",
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					children: "ลงทะเบียนสายรถ",
					onClick: () =>
						submit(
							{},
							{
								action: "/pickup-routes/new",
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
				รายชื่อสายรถ
			</Typography>
			<CustomTable entries={entries} />
		</Stack>
	);
};
