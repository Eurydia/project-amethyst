import {
	TableCell,
	TableSortLabel,
	Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { TypographyTooltip } from "./TypographyTooltip";

type BaseSortableTableHeaderProps = {
	isSortable: boolean;
	isSorted: boolean;
	label: string;
	order: "asc" | "desc";
	onSort: () => void;
};
export const BaseSortableTableHeader = (
	props: BaseSortableTableHeaderProps,
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
