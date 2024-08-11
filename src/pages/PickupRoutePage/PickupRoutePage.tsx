import {
	Box,
	Button,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Stack,
	Typography,
} from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { PickupRoutePageLoaderData } from "./loader";

export const PickupRoutePage: FC = () => {
	const { routeId } =
		useLoaderData() as PickupRoutePageLoaderData;
	const submit = useSubmit();
	const navigateVehicle = (vehicleId: string) => {
		submit(
			{},
			{ action: `/vehicle/${vehicleId}` },
		);
	};

	return (
		<Stack>
			<Typography variant="h1">
				สายรถ {routeId}
			</Typography>
			<Box>
				<Button variant="contained">
					แก้ไขข้อมูลสัญญา
				</Button>
			</Box>
			<List
				disablePadding
				subheader={
					<ListSubheader
						disableGutters
						disableSticky
					>
						<Typography variant="h2">
							ข้อมูลสัญญา
						</Typography>
					</ListSubheader>
				}
			>
				<ListItem>
					<ListItemText
						primary="ชื่อสาย"
						secondary={routeId}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary="เวลารับเข้า"
						secondary="07:45"
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary="เวลารับออก"
						secondary="17:45"
					/>
				</ListItem>
			</List>
			<List
				disablePadding
				subheader={
					<ListSubheader
						disableGutters
						disableSticky
					>
						<Typography variant="h2">
							ทะเบียนปัจจุบัน
						</Typography>
					</ListSubheader>
				}
			>
				{["AAAAAA", "BBBBBB", "CCCCCC"].map(
					(item) => (
						<ListItem key={`item-${item}`}>
							<ListItemButton
								onClick={() =>
									navigateVehicle(item)
								}
							>
								<ListItemText>
									{item}
								</ListItemText>
							</ListItemButton>
						</ListItem>
					),
				)}
			</List>

			<List
				disablePadding
				subheader={
					<ListSubheader
						disableGutters
						disableSticky
					>
						<Typography variant="h2">
							ประวัติทะเบียน
						</Typography>
					</ListSubheader>
				}
			>
				{["DDDDDD", "EEEEEE", "FFFFFF"].map(
					(item) => (
						<ListItem key={`item-${item}`}>
							<ListItemButton
								onClick={() =>
									navigateVehicle(item)
								}
							>
								<ListItemText>
									{item} (18 มี.ค. 2564 ถึง 18
									มี.ค. 2565)
								</ListItemText>
							</ListItemButton>
						</ListItem>
					),
				)}
			</List>
		</Stack>
	);
};
