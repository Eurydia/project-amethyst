import {
	Breadcrumbs,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type StyledBreadcrumbs = {
	path: string;
};
export const StyledBreadcrumbs: FC<
	StyledBreadcrumbs
> = (props) => {
	const { path } = props;

	const paths = path
		.normalize()
		.split("/")
		.filter((path) => path.trim().length > 0)
		.map(decodeURIComponent);

	const items = paths.map((path, index) => {
		return (
			<Typography key={path + index}>
				{path}
			</Typography>
		);
	});
	return <Breadcrumbs>{items}</Breadcrumbs>;
};
