import { VehicleTable } from "$components/VehicleTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { VehicleIndexPageLoaderData } from "./loader";

export const VehicleIndexPage: FC = () => {
  const { vendorComboBoxOptions, vehicleEntries } =
    useLoaderData() as VehicleIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">ทะเบียนรถรับส่ง</Typography>
      <VehicleTable
        entries={vehicleEntries}
        slotProps={{
          form: {
            vendorComboBox: {
              options: vendorComboBoxOptions,
            },
          },
        }}
      />
    </Stack>
  );
};
