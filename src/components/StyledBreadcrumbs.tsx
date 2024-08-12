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
			<Link
				key={"item" + index}
				to={paths.slice(1, index + 1).join("/")}
			>
				<Typography>{path}</Typography>
			</Link>
		);
	});
	return <Breadcrumbs>{items}</Breadcrumbs>;
};
