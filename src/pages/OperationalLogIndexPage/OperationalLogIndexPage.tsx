import { OperationalLogTable } from "$components/OperationalLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { OperationalLogIndexPageLoaderData } from "./loader";

export const OperationalLogIndexPage: FC = () => {
  const {
    logEntries,
    driverSelectOptions,
    routeSelectOptions,
    vehicleSelectOptions,
  } = useLoaderData() as OperationalLogIndexPageLoaderData;
  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        ตารางบันทึกประวัติการเดินรถ
      </Typography>
      <OperationalLogTable
        logEntries={logEntries}
        slotProps={{
          form: {
            vehicleSelect: {
              options: vehicleSelectOptions,
            },
            driverSelect: {
              options: driverSelectOptions,
            },
            routeSelect: {
              options: routeSelectOptions,
            },
          },
        }}
      />
    </Stack>
  );
};
