import { DriverTable } from "$components/DriverTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { DriverIndexPageLoaderData } from "./loader";

export const DriverIndexPage: FC = () => {
  const { driverEntries } =
    useLoaderData() as DriverIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">รายชื่อคนขับรถ</Typography>
      <DriverTable driverEntries={driverEntries} />
    </Stack>
  );
};
