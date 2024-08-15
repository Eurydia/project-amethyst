import { fakerTH } from "@faker-js/faker";
import {
	Checkbox,
	FormControlLabel,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { filterItems } from "../core/filter";

const items = fakerTH.helpers.multiple(
	() => {
		return {
			fname: fakerTH.person.firstName(),
			plate: fakerTH.vehicle.vrm(),
			route: fakerTH.location.city(),
		};
	},
	{
		count: 10,
	},
);

export const AttendanceTable: FC = () => {
	const { palette } = useTheme();
	const [search, setSearch] = useState("");

	const [checked, setCheck] = useState<
		Record<string, boolean | undefined>
	>({});

	/**
	 * The attendance status should not have toggle behavior.
	 * Once the status is set, it is locked to prevent misclicks.
	 */
	const updateAttendance = (key: string) => {
		if (checked[key] !== undefined) {
			return;
		}

		setCheck((prev) => {
			const next = { ...prev };
			next[key] = true;
			return next;
		});
	};

	const searchedItems = filterItems(
		items,
		search.split(" "),
		["fname", "plate", "route"],
	);

	return (
		<TableContainer>
			<Toolbar
				disableGutters
				variant="dense"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					alignItems: "flex-start",
				}}
			>
				<Typography fontWeight="bold">
					สถานะรับเข้าและรับออก
				</Typography>
				<TextField
					fullWidth
					label="ค้นหา"
					value={search}
					onChange={(e) =>
						setSearch(e.currentTarget.value)
					}
				/>
			</Toolbar>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>สายรถ</TableCell>
						<TableCell>ทะเบียนรถ</TableCell>
						<TableCell>คนขับ</TableCell>
						<TableCell>สถานะรับเข้า</TableCell>
						<TableCell>สถานะรับออก</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{searchedItems.map((item, index) => (
						<TableRow
							key={"item" + index}
							hover
						>
							<TableCell>
								<Link
									to={"pickup-routes/" + index}
								>
									{item.route}
								</Link>
							</TableCell>
							<TableCell>
								<Link to={"vehicles/" + index}>
									{item.plate}
								</Link>
							</TableCell>
							<TableCell>
								<Link to={"drivers/" + index}>
									{item.fname}
								</Link>
							</TableCell>
							<TableCell>
								<FormControlLabel
									label={
										checked["checkin" + index] ? (
											<Fragment>
												<Typography>
													{dayjs()
														.locale("th")
														.format("HH:mm น.")}
												</Typography>
												<Typography
													fontWeight="bold"
													color={
														palette.error.main
													}
												>
													สาย 45 นาที
												</Typography>
											</Fragment>
										) : null
									}
									onClick={() =>
										updateAttendance(
											"checkin" + index,
										)
									}
									disabled={
										checked["checkin" + index]
									}
									checked={
										checked["checkin" + index]
									}
									control={<Checkbox />}
								/>
							</TableCell>
							<TableCell>
								<FormControlLabel
									label={
										checked[
											"checkout" + index
										] ? (
											<Fragment>
												<Typography>
													{dayjs()
														.locale("th")
														.format("HH:mm น.")}
												</Typography>
												<Typography
													fontWeight="bold"
													color={
														palette.error.main
													}
												>
													สาย 45 นาที
												</Typography>
											</Fragment>
										) : null
									}
									onClick={() =>
										updateAttendance(
											"checkout" + index,
										)
									}
									disabled={
										checked["checkout" + index]
									}
									checked={
										checked["checkout" + index]
									}
									control={<Checkbox />}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
