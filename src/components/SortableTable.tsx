import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { TableHeaderDefinition } from "../types/generics";

type EnhancedTableHeaderProps<T extends Object> =
	{
		headerDefinitions: TableHeaderDefinition<T>[];
		order: "asc" | "desc";
		orderBy: keyof T;
		onRequestSort: (key: keyof T) => void;
	};

const EnhancedTableHeader = <T extends Object>(
	props: EnhancedTableHeaderProps<T>,
) => {
	const {
		headerDefinitions,
		order,
		orderBy,
		onRequestSort,
	} = props;

	const createSortHandler =
		(key: keyof T) => () =>
			onRequestSort(key);

	return (
		<TableHead>
			<TableRow>
				{headerDefinitions.map(
					(headCell, index) => (
						<TableCell
							key={"header" + index}
							sortDirection={
								orderBy === headCell.key
									? order
									: false
							}
						>
							<TableSortLabel
								active={orderBy === headCell.key}
								direction={
									orderBy === headCell.key
										? order
										: "asc"
								}
								onClick={createSortHandler(
									headCell.key,
								)}
							>
								{headCell.label}
							</TableSortLabel>
						</TableCell>
					),
				)}
			</TableRow>
		</TableHead>
	);
};

type SortableTableProps<T extends Object> = {
	rows: T[];
	headers: TableHeaderDefinition<T>[];
	defaultOrderBy: keyof T;
	defaultOrder: "asc" | "desc";
};
export const SortableTable = <T extends Object>(
	props: SortableTableProps<T>,
) => {
	const {
		rows,
		defaultOrder,
		defaultOrderBy,
		headers,
	} = props;

	const [order, setOrder] =
		useState(defaultOrder);
	const [orderBy, setOrderBy] = useState<keyof T>(
		defaultOrderBy,
	);

	const handleRequestSort = (key: keyof T) => {
		const isAsc =
			orderBy === key && order === "asc";

		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(key);
	};

	const sortedItems = [...rows];
	let target = headers.find(
		(header) => header.key === orderBy,
	);
	if (target === undefined) {
		sortedItems.sort((_) => 0);
	} else {
		const sortFn = target.compare;
		if (sortFn === null) {
			sortedItems.sort((_) => 0);
		} else {
			const multiplier = order === "asc" ? 1 : -1;
			sortedItems.sort(
				(a, b) => sortFn(a, b) * multiplier,
			);
		}
	}

	return (
		<Table>
			<EnhancedTableHeader
				headerDefinitions={headers}
				order={order}
				orderBy={orderBy}
				onRequestSort={handleRequestSort}
			/>
			<TableBody>
				{sortedItems.length === 0 ? (
					<TableRow hover>
						<TableCell colSpan={headers.length}>
							ไม่มีรายการให้แเสดง
						</TableCell>
					</TableRow>
				) : (
					sortedItems.map((item, rowIndex) => (
						<TableRow
							key={"row" + rowIndex}
							hover
						>
							{headers.map(
								(header, cellIndex) => (
									<TableCell
										key={`cell${cellIndex}${rowIndex}`}
									>
										{header.render(item)}
									</TableCell>
								),
							)}
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
