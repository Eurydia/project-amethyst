import {
	Typography,
	Stack,
	Card,
	CardHeader,
	CardActionArea,
} from "@mui/material";
import { FC, Fragment } from "react";
import { useSubmit } from "react-router-dom";

export const HomePage: FC = () => {
	const submit = useSubmit();

	const navigateToRoute = (routeId: string) => {
		submit(
			{},
			{
				action: "./pickup-route/" + routeId,
			},
		);
	};

	return (
		<Fragment>
			<Typography variant="h1">สายรถ</Typography>
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
							onClick={() =>
								navigateToRoute(item)
							}
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
		</Fragment>
	);
};
