import { DriverReportModel } from "$types/models";
import {
	InputAdornment,
	TableContainer,
	TextField,
	Toolbar,
} from "@mui/material";
import {
	ChangeEvent,
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { SortableTable } from "./SortableTable";
import { TableHeaderDefinition } from "$types/generics";
import { SearchRounded } from "@mui/icons-material";

type DriverReportModelTableProps = {
	label: string;
	slotToolbar?: ReactNode;
	rows: DriverReportModel[];
	headers: TableHeaderDefinition<DriverReportModel>[];
	defaultSortBy: keyof DriverReportModel;
	defaultSortOrder: "asc" | "desc";
	filterFn: (
		search: string,
		rows: DriverReportModel[],
	) => DriverReportModel[];
};
export const DriverReportModelTable: FC<
	DriverReportModelTableProps
> = (props) => {
	const {
		rows,
		headers,
		defaultSortBy,
		defaultSortOrder,
		filterFn,
		slotToolbar,
		label,
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
		return filterFn(search, rows);
	}, [search, rows]);

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
				{slotToolbar}
				<TextField
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchRounded />
							</InputAdornment>
						),
					}}
					placeholder={"ค้นหา" + label}
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
