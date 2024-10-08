import { TableHeaderDefinition } from "$types/generics";
import {
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { BaseSortableTableBody } from "./BaseSortableTableBody";
import { BaseSortableTableHead } from "./BaseSortableTableHead";

type BaseSortableTableProps<T> = {
  entries: T[];
  databaseIsEmpty: boolean;
  headers: TableHeaderDefinition<T>[];
  defaultSortByColumn: number;
  defaultSortOrder: "asc" | "desc";
};
export const BaseSortableTable = <T,>(
  props: BaseSortableTableProps<T>
) => {
  const {
    entries,
    headers,
    defaultSortByColumn,
    defaultSortOrder,
    databaseIsEmpty,
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

  const emptyText = databaseIsEmpty
    ? "ฐานข้อมูลว่าง"
    : "ไม่พบรายการที่ค้นหา";

  return (
    <Fragment>
      <Typography>พบ {entries.length} รายการ</Typography>
      <TableContainer>
        <Table>
          <BaseSortableTableHead
            headerDefinitions={headers}
            order={sortOrder}
            orderByColumn={sortByColumn}
            onRequestSort={handleRequestSort}
          />
          <BaseSortableTableBody
            emptyText={emptyText}
            entries={sortedEntries}
            headers={headers}
          />
        </Table>
      </TableContainer>
    </Fragment>
  );
};
