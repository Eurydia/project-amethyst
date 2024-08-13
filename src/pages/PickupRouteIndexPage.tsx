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

let uuid = 0;
const routes = fakerTH.helpers.uniqueArray(() => {
	return {
		label: fakerTH.location.city(),
		id: uuid++,
		vehicles: fakerTH.helpers.uniqueArray(
			fakerTH.vehicle.vrm,
			3,
		),
	};
}, 8);

export const PickupRouteIndexPage: FC = () => {
	const submit = useSubmit();
	const [search, setSearch] = useState("");

	const navigateToDraft = () => {
		submit(
			{},
			{ action: "/pickup-routes/draft" },
		);
	};

	const searchedRoutes = filterItems(
		routes,
		search.split(" "),
		["label"],
	);

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				สายรถทั้งหมด
			</Typography>
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
					<Button
						disableElevation
						variant="contained"
						onClick={navigateToDraft}
					>
						เพิ่มสายรถ
					</Button>
					<TextField
						fullWidth
						label="ค้นหา"
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
													"/pickup-routes/" +
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
