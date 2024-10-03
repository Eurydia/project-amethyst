import { TableHeaderDefinition } from "$types/generics";
import {
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BaseSortableTableBody } from "./BaseSortableTableBody";
import { BaseSortableTableHead } from "./BaseSortableTableHead";

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
  props: BaseSortableTableProps<T>
) => {
  const {
    entries,
    headers,
    defaultSortByColumn,
    defaultSortOrder,
    slotProps,
  } = props;

  const [sortOrder, setOrderDirection] = useState(
    defaultSortOrder
  );
  const [sortByColumn, setOrderColumn] = useState(
    defaultSortByColumn
  );

  const handleRequestSort = (colNumber: number) => {
    const isAsc =
      sortByColumn === colNumber && sortOrder === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderColumn(colNumber);
  };
  let sortedEntries = [...entries];
  if (sortByColumn < headers.length && sortByColumn >= 0) {
    if (headers[sortByColumn].compare !== null) {
      sortedEntries = sortedEntries.sort(
        headers[sortByColumn].compare
      );
    }
    if (sortOrder === "desc") {
      sortedEntries.reverse();
    }
  }
  return (
    <TableContainer>
      <Typography>พบ {entries.length} รายการ</Typography>
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
