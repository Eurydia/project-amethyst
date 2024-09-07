import { FormalLayout } from "$layouts/FormalLayout";
import {
	AddRounded,
	FilterAlt,
	SearchRounded,
} from "@mui/icons-material";
import {
	Collapse,
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { TableHeaderDefinition } from "../types/generics";
import { TypographyButton } from "./TypographyButton";
import { TypographyTooltip } from "./TypographyTooltip";

type CustomTableHeaderProps = {
	isSortable: boolean;
	isSorted: boolean;
	label: string;
	order: "asc" | "desc";
	onSort: () => void;
};
const CustomTableHeader = (
	props: CustomTableHeaderProps,
) => {
	const {
		order,
		isSortable,
		label,
		isSorted,
		onSort,
	} = props;
	if (!isSortable) {
		return (
			<TableCell>
				<Typography>{label}</Typography>
			</TableCell>
		);
	}

	const sortOrder = isSorted ? order : undefined;

	let header: ReactNode = (
		<TableSortLabel
			active={isSorted}
			direction={sortOrder}
			onClick={onSort}
		>
			<Typography>{label}</Typography>
		</TableSortLabel>
	);
	if (isSorted) {
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
		<TableCell sortDirection={sortOrder}>
			{header}
		</TableCell>
	);
};

type CustomTableHeadProps<T> = {
	headerDefinitions: TableHeaderDefinition<T>[];
	order: "asc" | "desc";
	orderByColumn: number;
	onRequestSort: (colNumber: number) => void;
};
const CustomTableHead = <T,>(
	props: CustomTableHeadProps<T>,
) => {
	const {
		headerDefinitions,
		order,
		orderByColumn,
		onRequestSort,
	} = props;

	const sortHandler = (colNumber: number) => () =>
		onRequestSort(colNumber);

	const renderedHeaders = headerDefinitions.map(
		(headCell, index) => (
			<CustomTableHeader
				key={"header" + index}
				isSortable={headCell.compare !== null}
				isSorted={orderByColumn === index}
				label={headCell.label}
				order={order}
				onSort={sortHandler(index)}
			/>
		),
	);

	return (
		<TableHead>
			<TableRow>{renderedHeaders}</TableRow>
		</TableHead>
	);
};

type CustomTableBodyProps<T> = {
	entries: T[];
	headers: TableHeaderDefinition<T>[];
};
const CustomTableBody = <T,>(
	props: CustomTableBodyProps<T>,
) => {
	const { entries, headers } = props;

	if (entries.length === 0) {
		return (
			<TableBody>
				<TableRow hover>
					<TableCell colSpan={headers.length}>
						<Typography>ไม่พบรายการ</Typography>
					</TableCell>
				</TableRow>
			</TableBody>
		);
	}
	const renderedRows = entries.map(
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

	return <TableBody>{renderedRows}</TableBody>;
};

type CustomToolbarProps = {
	count: number;
	onFilterToggle: () => void;
};
const CustomToolbar: FC<CustomToolbarProps> = (
	props,
) => {
	const { count, onFilterToggle } = props;
	return (
		<Toolbar
			disableGutters
			variant="dense"
			sx={{
				gap: 1,
				display: "flex",
				flexDirection: "wrap",
				justifyContent: "space-between",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			<Typography>พบ {count} รายการ</Typography>
			<TypographyButton
				variant="text"
				startIcon={<FilterAlt />}
				onClick={onFilterToggle}
			>
				ตัวเลือกการกรอง
			</TypographyButton>
		</Toolbar>
	);
};

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
		searchField: {
			placeholder: string;
			value: string;
			onChange: (value: string) => void;
		};
		addButton: {
			hidden?: boolean;
			disabled?: boolean;
			onClick: () => void;
			label: string;
		};
	};
	children: {
		label: string;
		value: ReactNode;
	}[];
};
export const BaseSortableTable = <T,>(
	props: BaseSortableTableProps<T>,
) => {
	const {
		entries,
		defaultSortOrder,
		defaultSortByColumn,
		headers,
		slotProps,
		children,
	} = props;

	const [filterOpen, setFilterOpen] =
		useState(false);
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
		<TableContainer
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1,
			}}
		>
			<TypographyButton
				startIcon={<AddRounded />}
				variant="contained"
				onClick={slotProps.addButton.onClick}
				disabled={slotProps.addButton.disabled}
				sx={{
					display: slotProps.addButton.hidden
						? "none"
						: undefined,
				}}
			>
				{slotProps.addButton.label}
			</TypographyButton>
			<TextField
				fullWidth
				placeholder={
					slotProps.searchField.placeholder
				}
				value={slotProps.searchField.value}
				onChange={(e) =>
					slotProps.searchField.onChange(
						e.target.value,
					)
				}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchRounded />
							</InputAdornment>
						),
					},
				}}
			/>
			<CustomToolbar
				count={sortedEntries.length}
				onFilterToggle={() =>
					setFilterOpen(!filterOpen)
				}
			/>
			<Collapse in={filterOpen}>
				<FormalLayout>{children}</FormalLayout>
			</Collapse>
			<Table
				sx={{
					overflow: "auto",
				}}
			>
				<CustomTableHead
					headerDefinitions={headers}
					order={sortOrder}
					orderByColumn={sortByColumn}
					onRequestSort={handleRequestSort}
				/>
				<CustomTableBody
					entries={sortedEntries}
					headers={headers}
				/>
			</Table>
		</TableContainer>
	);
};
