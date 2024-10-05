import { TableHead, TableRow } from "@mui/material";
import { TableHeaderDefinition } from "../types/generics";
import { BaseSortableTableHeader } from "./BaseSortableTableHeader";

type BaseSortableTableHeadProps<T> = {
  headerDefinitions: TableHeaderDefinition<T>[];
  order: "asc" | "desc";
  orderByColumn: number;
  onRequestSort: (colNumber: number) => void;
};
export const BaseSortableTableHead = <T,>(
  props: BaseSortableTableHeadProps<T>
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
      <BaseSortableTableHeader
        key={"header" + index}
        isSortable={headCell.compare !== null}
        isSorted={orderByColumn === index}
        label={headCell.label}
        order={order}
        onSort={sortHandler(index)}
      />
    )
  );

  return (
    <TableHead>
      <TableRow>{renderedHeaders}</TableRow>
    </TableHead>
  );
};
