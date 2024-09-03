import { TRANSLATION } from "$locale/th";
import {
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { FC } from "react";

type CustomItemProps = {
	isChecked?: boolean;
	isBold?: boolean;
	label: string;
	onClick: () => void;
};
const CustomItem: FC<CustomItemProps> = (
	props,
) => {
	const { isBold, isChecked, onClick, label } =
		props;

	return (
		<ListItem
			dense
			disableGutters
			disablePadding
			sx={{
				display: "inline",
				width: "auto",
			}}
		>
			<ListItemButton
				disableRipple
				onClick={onClick}
			>
				<ListItemIcon>
					<Checkbox
						disableRipple
						checked={isChecked}
					/>
				</ListItemIcon>
				<ListItemText disableTypography>
					<Typography
						sx={{
							fontWeight: isBold
								? "bold"
								: "normal",
						}}
					>
						{label}
					</Typography>
				</ListItemText>
			</ListItemButton>
		</ListItem>
	);
};

type BaseInputMultiSelectProps = {
	options: { label: string; value: string }[];
	selectedOptions: string[];
	onChange: (option: string[]) => void;
};
export const BaseInputMultiSelect: FC<
	BaseInputMultiSelectProps
> = (props) => {
	const { options, selectedOptions, onChange } =
		props;

	const toggleHandler = (value: string) => () => {
		if (!selectedOptions.includes(value)) {
			onChange([...selectedOptions, value]);
			return;
		}
		onChange(
			selectedOptions.filter(
				(selectOption) => selectOption !== value,
			),
		);
	};

	const renderedOptions = options.map(
		({ label, value }, index) => {
			const handleClick = toggleHandler(value);
			const isChecked =
				selectedOptions.includes(value);

			return (
				<CustomItem
					key={"item" + index}
					onClick={handleClick}
					label={label}
					isChecked={isChecked}
				/>
			);
		},
	);

	const handleToggleAll = () => {
		if (isPartiallySelect) {
			onChange([]);
			return;
		}
		onChange(options.map(({ value }) => value));
	};

	const isPartiallySelect =
		selectedOptions.length > 0;

	return (
		<List
			dense
			disablePadding
			sx={{
				overflow: "auto",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			<CustomItem
				label={TRANSLATION.globalSelectAll}
				onClick={handleToggleAll}
				isChecked={isPartiallySelect}
				isBold
			/>
			{renderedOptions}
		</List>
	);
};
