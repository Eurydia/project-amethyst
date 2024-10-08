import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { TableHeaderDefinition } from "../types/generics";

type BaseSortableTableBodyProps<T> = {
  entries: T[];
  headers: TableHeaderDefinition<T>[];
  emptyText: string;
};
export const BaseSortableTableBody = <T,>(
  props: BaseSortableTableBodyProps<T>
) => {
  const { entries, headers, emptyText } = props;

  if (entries.length === 0) {
    return (
      <TableBody>
        <TableRow hover>
          <TableCell colSpan={headers.length}>
            <Typography fontStyle="italic">
              {emptyText}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  const renderedRows = entries.map((item, rowIndex) => (
    <TableRow
      key={"row" + rowIndex}
      hover
    >
      {headers.map((header, cellIndex) => (
        <TableCell key={"cell" + cellIndex + rowIndex}>
          {header.render(item)}
        </TableCell>
      ))}
    </TableRow>
  ));

  return <TableBody>{renderedRows}</TableBody>;
};
