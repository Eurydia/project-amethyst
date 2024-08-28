import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { TableHeaderDefinition } from "../types/generics";
import { TypographyTooltip } from "./TypographyTooltip";

type TableHeaderProps<T extends Object> = {
	headerDefinitions: TableHeaderDefinition<T>[];
	order: "asc" | "desc";
	orderBy: keyof T;
	onRequestSort: (key: keyof T) => void;
};
const TableHeader = <T extends Object>(
	props: TableHeaderProps<T>,
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

	const renderedHeaders = headerDefinitions.map(
		(headCell, index) => {
			const sortDisabled =
				headCell.compare === null;
			if (sortDisabled) {
				return (
					<TableCell key={"header" + index}>
						<Typography>
							{headCell.label}
						</Typography>
					</TableCell>
				);
			}

			const isActive = orderBy === headCell.key;
			const sortOrder = isActive
				? order
				: undefined;

			let header: ReactNode = (
				<TableSortLabel
					active={isActive}
					direction={sortOrder}
					onClick={createSortHandler(
						headCell.key,
					)}
				>
					<Typography>
						{headCell.label}
					</Typography>
				</TableSortLabel>
			);
			if (isActive) {
				const toolTipTitle =
					sortOrder === "asc"
						? "น้อยขึ้นไปมาก"
						: "มากลงไปน้อย";
				header = (
					<TypographyTooltip title={toolTipTitle}>
						{header}
					</TypographyTooltip>
				);
			}

			return (
				<TableCell
					key={"header" + index}
					sortDirection={sortOrder}
				>
					{header}
				</TableCell>
			);
		},
	);

	return (
		<TableHead>
			<TableRow>{renderedHeaders}</TableRow>
		</TableHead>
	);
};

type SortableTableProps<T extends Object> = {
	rows: T[];
	headers: TableHeaderDefinition<T>[];
	defaultSortBy: keyof T;
	defaultSortOrder: "asc" | "desc";
};
export const SortableTable = <T extends Object>(
	props: SortableTableProps<T>,
) => {
	const {
		rows,
		defaultSortOrder,
		defaultSortBy,
		headers,
	} = props;

	const [order, setOrder] = useState(
		defaultSortOrder,
	);
	const [orderBy, setOrderBy] = useState<keyof T>(
		defaultSortBy,
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

	let tableBody: ReactNode = (
		<TableRow hover>
			<TableCell colSpan={headers.length}>
				<Typography>
					ไม่มีรายการในตาราง
				</Typography>
			</TableCell>
		</TableRow>
	);
	if (sortedItems.length !== 0) {
		tableBody = sortedItems.map(
			(item, rowIndex) => (
				<TableRow
					key={"row" + rowIndex}
					hover
				>
					{headers.map((header, cellIndex) => (
						<TableCell
							key={`cell${cellIndex}${rowIndex}`}
						>
							{header.render(item)}
						</TableCell>
					))}
				</TableRow>
			),
		);
	}

	return (
		<Table>
			<TableHeader
				headerDefinitions={headers}
				order={order}
				orderBy={orderBy}
				onRequestSort={handleRequestSort}
			/>
			<TableBody>{tableBody}</TableBody>
		</Table>
	);
};
