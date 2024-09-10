import {
	Table,
	TableContainer,
} from "@mui/material";
import { useState } from "react";
import { TableHeaderDefinition } from "../types/generics";
import { BaseSortableTableBody } from "./BaseSortableTableBody";
import { BaseSortableTableHead } from "./BaseSortableTableHead";

const sortEntries = <T,>(
	entries: T[],
	headers: TableHeaderDefinition<T>[],
	sortByColumn: number,
	sortOrder: string,
) => {
	const items = [...entries];
	if (
		sortByColumn < headers.length &&
		sortByColumn >= 0
	) {
		if (headers[sortByColumn].compare !== null) {
			items.sort(headers[sortByColumn].compare);
		}
		if (sortOrder === "desc") {
			items.reverse();
		}
	}
	return items;
};

type BaseSortableTableProps<T> = {
	entries: T[];
	headers: TableHeaderDefinition<T>[];
	defaultSortByColumn: number;
	defaultSortOrder: "asc" | "desc";
	slotProps: {
		body: {
			emptyText: string;
		};
	};
};
export const BaseSortableTable = <T,>(
	props: BaseSortableTableProps<T>,
) => {
	const {
		entries,
		headers,
		defaultSortByColumn,
		defaultSortOrder,
		slotProps,
	} = props;

	const [sortOrder, setOrderDirection] = useState(
		defaultSortOrder,
	);
	const [sortByColumn, setOrderColumn] = useState(
		defaultSortByColumn,
	);

	const handleRequestSort = (
		colNumber: number,
	) => {
		const isAsc =
			sortByColumn === colNumber &&
			sortOrder === "asc";
		setOrderDirection(isAsc ? "desc" : "asc");
		setOrderColumn(colNumber);
	};

	const sortedEntries = sortEntries(
		entries,
		headers,
		sortByColumn,
		sortOrder,
	);

	return (
		<TableContainer>
			<Table sx={{ tableLayout: "fixed" }}>
				<BaseSortableTableHead
					headerDefinitions={headers}
					order={sortOrder}
					orderByColumn={sortByColumn}
					onRequestSort={handleRequestSort}
				/>
				<BaseSortableTableBody
					emptyText={slotProps.body.emptyText}
					entries={sortedEntries}
					headers={headers}
				/>
			</Table>
		</TableContainer>
	);
};
