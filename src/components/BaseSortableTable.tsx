import {
	ButtonProps,
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
	TextFieldProps,
	Toolbar,
	Typography,
} from "@mui/material";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { TableHeaderDefinition } from "../types/generics";
import { TypographyTooltip } from "./TypographyTooltip";
import { TypographyButton } from "./TypographyButton";
import {
	AddRounded,
	FilterAlt,
	SearchRounded,
} from "@mui/icons-material";
import { FormalLayout } from "$layouts/FormalLayout";

type CustomTableHeadProps<T> = {
	headerDefinitions: TableHeaderDefinition<T>[];
	order: "asc" | "desc";
	orderByColumn: number;
	onRequestSort: (colNumber: number) => void;
};
const CustomTableHeader = <T,>(
	props: CustomTableHeadProps<T>,
) => {
	const {
		headerDefinitions,
		order,
		orderByColumn,
		onRequestSort,
	} = props;

	const createSortHandler =
		(colNumber: number) => () =>
			onRequestSort(colNumber);

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

			const isActive = orderByColumn === index;
			const sortOrder = isActive
				? order
				: undefined;

			const handleClick =
				createSortHandler(index);

			let header: ReactNode = (
				<TableSortLabel
					active={isActive}
					direction={sortOrder}
					onClick={handleClick}
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
						<Typography>
							ไม่มีรายการในตาราง
						</Typography>
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
				ตัวกรองขั้นสูง
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
		searchField: TextFieldProps;
		addButton: ButtonProps;
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
		console.log("Sort by column", colNumber);
	};

	const sortedEntries = useMemo(
		() =>
			sortEntries(
				entries,
				headers,
				sortByColumn,
				sortOrder,
			),
		[entries, sortByColumn, sortOrder, headers],
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
				{...slotProps.addButton}
				startIcon={<AddRounded />}
				variant="contained"
			/>
			<TextField
				{...slotProps.searchField}
				fullWidth
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
			<Table>
				<CustomTableHeader
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
