import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type BaseTypographyLinkProps = {
	toPage: string;
	children: ReactNode[] | ReactNode;
};
export const BaseTypographyLink: FC<
	BaseTypographyLinkProps
> = (props) => {
	const { children, toPage } = props;

	return (
		<Typography
			component={Link}
			to={toPage}
		>
			{children}
		</Typography>
	);
};
