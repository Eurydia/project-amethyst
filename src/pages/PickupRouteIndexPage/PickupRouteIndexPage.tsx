/** @format */

import { PickupRouteTable } from "$components/PickupRouteTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { PickupRouteIndexPageLoaderData } from "./loader";

export const PickupRouteIndexPage: FC = () => {
  const { routeEntries } = useLoaderData() as PickupRouteIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">รายชื่อสายรถ</Typography>
      <PickupRouteTable routeEntries={routeEntries} />
    </Stack>
  );
};
