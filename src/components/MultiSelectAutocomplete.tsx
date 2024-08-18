import {
	CancelRounded,
	CheckBoxOutlineBlankRounded,
	CheckBoxRounded,
	SearchRounded,
} from "@mui/icons-material";
import {
	Box,
	Checkbox,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Stack,
	TextField,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { FC, ReactNode, useState } from "react";

type MultiSelectAutocompleteProps = {
	options: string[];
	value: string[];
	placeholder?: string;
	onChange: (value: string[]) => void;
};
export const MultiSelectAutocomplete: FC<
	MultiSelectAutocompleteProps
> = (props) => {
	const {
		options,
		value,
		placeholder,
		onChange,
	} = props;

	const [search, setSearch] = useState("");

	const handleSearchChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSearch(e.target.value);
	};

	const createToggleHandler =
		(option: string) => () => {
			if (!value.includes(option)) {
				onChange([...value, option]);
				return;
			}
			onChange(value.filter((v) => v !== option));
		};

	const filteredOptions = matchSorter(
		[...new Set([...options, ...value])],
		search,
	);

	if (
		filteredOptions.length === 0 &&
		search.trim().normalize() !== ""
	) {
		filteredOptions.push(
			search.trim().normalize(),
		);
	}

	return (
		<Box>
			<Stack spacing={1}>
				<Toolbar
					disableGutters
					variant="dense"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						gap: 1,
					}}
				>
					<TextField
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchRounded />
								</InputAdornment>
							),
						}}
						placeholder="ค้นหาหัวข้อ"
						value={search}
						onChange={handleSearchChange}
					/>
					<Stack
						useFlexGap
						spacing={1}
						direction="row"
						flexWrap="wrap"
						alignItems="center"
					>
						<Typography>
							เลือกแล้ว {value.length} หัวข้อ
						</Typography>
						<Tooltip
							arrow
							title={
								<Typography>
									ยกเลิกหัวข้อทั้งหมด
								</Typography>
							}
						>
							<span>
								<IconButton
									size="small"
									disabled={value.length === 0}
									onClick={() => onChange([])}
								>
									<CancelRounded />
								</IconButton>
							</span>
						</Tooltip>
					</Stack>
				</Toolbar>
				<List
					dense
					disablePadding
					sx={{
						overflow: "auto",
						maxHeight: 150,
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: ({ spacing }) => spacing(1),
					}}
				>
					{filteredOptions.map(
						(option, index) => (
							<ListItem
								disableGutters
								disablePadding
								key={"item" + index}
								sx={{
									display: "inline",
									width: "auto",
								}}
							>
								<ListItemButton
									onClick={createToggleHandler(
										option,
									)}
								>
									<ListItemIcon>
										<Checkbox
											disableRipple
											checked={value.includes(
												option,
											)}
										/>
									</ListItemIcon>
									<ListItemText>
										<Typography>
											{option}
										</Typography>
									</ListItemText>
								</ListItemButton>
							</ListItem>
						),
					)}
				</List>
			</Stack>
		</Box>
	);
};
