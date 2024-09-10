import {
	AddRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
	InputAdornment,
	TextField,
	Toolbar,
} from "@mui/material";
import { FC } from "react";
import { TypographyButton } from "./TypographyButton";

type BaseSortableTableToolbarProps = {
	slotProps: {
		searchField: {
			onChange: (value: string) => void;
			value: string;
			placeholder: string;
		};
		addButton: {
			label: string;
			disabled?: boolean;
			onClick: () => void;
		};
	};
};
export const BaseSortableTableToolbar: FC<
	BaseSortableTableToolbarProps
> = (props) => {
	const { slotProps } = props;
	return (
		<Toolbar
			disableGutters
			variant="dense"
			sx={{
				gap: 1,
				display: "flex",
				flexDirection: "column",
				flexWrap: "wrap",
				alignItems: "flex-start",
			}}
		>
			<TypographyButton
				variant="contained"
				startIcon={<AddRounded />}
				onClick={slotProps.addButton.onClick}
				disabled={slotProps.addButton.disabled}
			>
				{slotProps.addButton.label}
			</TypographyButton>
			<TextField
				fullWidth
				autoComplete="off"
				autoCapitalize="off"
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
		</Toolbar>
	);
};
