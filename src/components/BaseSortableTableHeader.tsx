import {
  TableCell,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

type BaseSortableTableHeaderProps = {
  isSortable: boolean;
  isSorted: boolean;
  label: string;
  order: "asc" | "desc";
  onSort: () => void;
};
export const BaseSortableTableHeader = (
  props: BaseSortableTableHeaderProps
) => {
  const { order, isSortable, label, isSorted, onSort } =
    props;
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
    const sortOrderLabel =
      sortOrder === "asc" ? "น้อยขึ้นไปมาก" : "มากลงไปน้อย";
    header = (
      <Tooltip
        arrow
        title={
          <Typography
            sx={{
              userSelect: "none",
              wordBreak: "keep-all",
            }}
          >
            {sortOrderLabel}
          </Typography>
        }
      >
        {header}
      </Tooltip>
    );
  }

  return (
    <TableCell sortDirection={sortOrder}>
      {header}
    </TableCell>
  );
};
