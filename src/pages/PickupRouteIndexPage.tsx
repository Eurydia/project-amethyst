import {
	Stack,
	Card,
	CardHeader,
	CardActionArea,
} from "@mui/material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";

export const PickupRouteIndexPage: FC = () => {
	const submit = useSubmit();

	const navigateToRoute = (routeId: string) => {
		submit(
			{},
			{
				action: "/สายรถ/" + routeId,
			},
		);
	};

	return (
		<Stack spacing={2}>
			{[
				"Philippines",
				"Singapore",
				"Malaysia",
				"Indonesia",
			].map((item) => (
				<Card
					key={`item-${item}`}
					variant="outlined"
				>
					<CardActionArea
						onClick={() => navigateToRoute(item)}
					>
						<CardHeader
							title={item}
							titleTypographyProps={{
								variant: "h2",
							}}
						/>
					</CardActionArea>
				</Card>
			))}
		</Stack>
	);
};
