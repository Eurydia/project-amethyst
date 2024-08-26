import {
	InputAdornment,
	TableContainer,
	TextField,
	Toolbar,
} from "@mui/material";
import {
	ChangeEvent,
	useMemo,
	useState,
} from "react";
import { SortableTable } from "./SortableTable";
import { TableHeaderDefinition } from "$types/generics";
import { SearchRounded } from "@mui/icons-material";
import { filterItems } from "$core/filter";

type DriverReportTableProps<T extends Object> = {
	searchPlaceholder?: string;
	searchKeys: (keyof T)[];
	headers: TableHeaderDefinition<T>[];
	rows: T[];
	defaultSortBy: keyof T;
	defaultSortOrder: "asc" | "desc";
};
export const DriverReportTable = <
	T extends Object,
>(
	props: DriverReportTableProps<T>,
) => {
	const {
		rows,
		searchKeys,
		defaultSortBy,
		defaultSortOrder,
		headers,
		searchPlaceholder,
	} = props;
	const [search, setSearch] = useState("");

	const handleSearchChange = (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		setSearch(e.target.value);
	};
	const filteredRows = useMemo(() => {
		const tokens = search
			.split(" ")
			.map((token) => token.trim())
			.filter((token) => token !== "");

		return filterItems(
			rows,
			tokens,
			searchKeys.map((key) => key.toString()),
		);
	}, [search, rows, searchKeys]);

	return (
		<TableContainer>
			<Toolbar
				disableGutters
				variant="dense"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					alignItems: "flex-start",
				}}
			>
				<TextField
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchRounded />
							</InputAdornment>
						),
					}}
					placeholder={searchPlaceholder}
					value={search}
					onChange={handleSearchChange}
				/>
			</Toolbar>
			<SortableTable
				rows={filteredRows}
				headers={headers}
				defaultSortOrder={defaultSortOrder}
				defaultOrderBy={defaultSortBy}
			/>
		</TableContainer>
	);
};
