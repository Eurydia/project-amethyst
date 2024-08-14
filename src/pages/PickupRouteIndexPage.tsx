import { fakerTH } from "@faker-js/faker";
import {
	Stack,
	Card,
	CardHeader,
	CardActionArea,
	Typography,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Toolbar,
	List,
	ListItem,
	ListItemText,
	TextField,
	Box,
} from "@mui/material";
import { FC, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { filterItems } from "../core/filter";
import {
	AddRounded,
	TurnSlightRightRounded,
} from "@mui/icons-material";

let uuid = 0;
const routes = fakerTH.helpers.multiple(
	() => {
		return {
			label: fakerTH.location.city(),
			id: uuid++,
			vehicles: fakerTH.helpers.uniqueArray(
				fakerTH.vehicle.vrm,
				3,
			),
		};
	},
	{ count: 8 },
);

export const PickupRouteIndexPage: FC = () => {
	const submit = useSubmit();
	const [search, setSearch] = useState("");

	const navigateToDraft = () => {};

	const searchedRoutes = filterItems(
		routes,
		search.split(" "),
		["label"],
	);

	return (
		<Stack spacing={2}>
			<Typography variant="h1">สายรถ</Typography>
			<TableContainer>
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
					<Stack
						useFlexGap
						direction="row"
						spacing={1}
						flexWrap="wrap"
					>
						<Button
							disableElevation
							variant="contained"
							startIcon={<AddRounded />}
							onClick={() =>
								submit(
									{},
									{
										action: "/pickup-routes/new",
									},
								)
							}
						>
							เพิ่มสายรถ
						</Button>
						<Button
							startIcon={
								<TurnSlightRightRounded />
							}
							disableElevation
							variant="contained"
							onClick={() =>
								submit(
									{},
									{
										action:
											"/pickup-routes/draft",
									},
								)
							}
						>
							เขียนบันทึกสายรถ
						</Button>
					</Stack>
					<TextField
						fullWidth
						placeholder="ค้นหา"
						value={search}
						onChange={(e) =>
							setSearch(e.target.value)
						}
					/>
				</Toolbar>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ชื่อสาย</TableCell>
							<TableCell>ทะเบียนรถ</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{searchedRoutes.map(
							(route, index) => (
								<TableRow
									key={"record" + index}
									hover
								>
									<TableCell>
										<Typography>
											<Link
												to={
													"/pickup-routes/id/" +
													route.id
												}
											>
												{route.label}
											</Link>
										</Typography>
									</TableCell>
									<TableCell>
										<List
											dense
											disablePadding
										>
											{route.vehicles.map(
												(item) => (
													<ListItem
														key={
															"item" +
															route.id.toString() +
															item
														}
													>
														<ListItemText>
															<Link
																to={
																	"/vehicles/" +
																	item
																}
															>
																{item}
															</Link>
														</ListItemText>
													</ListItem>
												),
											)}
										</List>
									</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
