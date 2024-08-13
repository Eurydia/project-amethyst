import { fakerTH } from "@faker-js/faker";
import {
	TableContainer,
	Toolbar,
	Stack,
	Typography,
	TextField,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	FormControlLabel,
	Checkbox,
	useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { matchSorter } from "match-sorter";
import {
	FC,
	Fragment,
	ReactNode,
	useState,
} from "react";
import { Link } from "react-router-dom";

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

export const AttendanceChecklistWidget: FC =
	() => {
		const { palette } = useTheme();
		const [search, setSearch] = useState("");
		const [attendance, setAttendance] = useState<
			Record<string, ReactNode>
		>({});

		const updateAttendance = (key: string) => {
			setAttendance((prev) => {
				const next = {
					...prev,
				};

				const entry = next[key];
				const value =
					entry === undefined ? (
						<Fragment>
							<Typography>
								{dayjs()
									.locale("th")
									.format("HH:mm น.")}
							</Typography>
							<Typography
								fontWeight="bold"
								color={palette.error.main}
							>
								สาย 45 นาที
							</Typography>
						</Fragment>
					) : undefined;
				next[key] = value;
				return next;
			});
		};

		const searchedItems = search
			.split(" ")
			.reduceRight(
				(results, term) =>
					matchSorter(results, term, {
						keys: ["fname", "plate", "route"],
					}),
				items,
			);

		return (
			<TableContainer
				sx={{
					minHeight: 500,
				}}
			>
				<Toolbar disableGutters>
					<Stack spacing={2}>
						<Typography variant="h2">
							สถานะรับเข้าและรับออก
						</Typography>
						<TextField
							label="ค้นหา"
							value={search}
							onChange={(e) =>
								setSearch(e.currentTarget.value)
							}
						/>
					</Stack>
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
										to={"สายรถ/" + item.route}
									>
										{item.route}
									</Link>
								</TableCell>
								<TableCell>
									<Link
										to={"ทะเบียนรถ/" + item.plate}
									>
										{item.plate}
									</Link>
								</TableCell>
								<TableCell>
									<Link
										to={"คนขับ/" + item.fname}
									>
										{item.fname}
									</Link>
								</TableCell>
								<TableCell>
									<FormControlLabel
										label={
											attendance[
												"checkin" + index
											]
										}
										onClick={() =>
											updateAttendance(
												"checkin" + index,
											)
										}
										control={<Checkbox />}
									/>
								</TableCell>
								<TableCell>
									<FormControlLabel
										label={
											attendance[
												"checkout" + index
											]
										}
										onClick={() =>
											updateAttendance(
												"checkout" + index,
											)
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
