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

type CustomListItemProps = {
	isChecked?: boolean;
	isBold?: boolean;
	label: string;
	onClick: () => void;
};
const CustomListItem: FC<CustomListItemProps> = (
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
				<ListItemText>
					<Typography
						fontWeight={
							isBold ? "bold" : undefined
						}
					>
						{label}
					</Typography>
				</ListItemText>
			</ListItemButton>
		</ListItem>
	);
};

type CustomListProps = {
	options: { label: string; value: string }[];
	selectedOptions: string[];
	onChange: (option: string[]) => void;
};
export const MultiSelect: FC<CustomListProps> = (
	props,
) => {
	const { options, selectedOptions, onChange } =
		props;

	const createToggleHandler =
		(value: string) => () => {
			if (!selectedOptions.includes(value)) {
				onChange([...selectedOptions, value]);
				return;
			}
			onChange(
				selectedOptions.filter(
					(selectOption) =>
						selectOption !== value,
				),
			);
		};

	const renderedOptions = options.map(
		({ label, value }, index) => {
			const handleClick =
				createToggleHandler(value);
			const isChecked =
				selectedOptions.includes(value);

			return (
				<CustomListItem
					key={"option" + index}
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
			<CustomListItem
				label="ทั้งหมด"
				onClick={handleToggleAll}
				isChecked={isPartiallySelect}
				isBold
			/>
			{renderedOptions}
		</List>
	);
};
