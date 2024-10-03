/** @format */

import { FormalLayout } from "$layouts/FormalLayout";
import { PickupRouteModel } from "$types/models/pickup-route";
import { EditRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { PickupRouteForm } from "./PickupRouteForm";

type PickupRouteInfoGroupProps = {
  route: PickupRouteModel;
};
export const PickupRouteInfoGroup: FC<
  PickupRouteInfoGroupProps
> = (props) => {
  const { route } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const infoItems = [
    {
      label: "ชื่อสาย",
      value: route.name,
    },
    {
      label: "Arrival time", // TODO: translate
      value: dayjs(route.arrival_time, "HH:mm").format(
        "HH:mm น."
      ),
    },
    {
      label: "Departure time", // TODO: translate
      value: dayjs(route.departure_time, "HH:mm").format(
        "HH:mm น."
      ),
    },
  ].map(({ label, value }) => ({
    label,
    value: <Typography>{value}</Typography>,
  }));

  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        onClick={() => setDialogOpen(true)}
        startIcon={<EditRounded />}
      >
        แก้ไขข้อมูล
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>
      <PickupRouteForm
        editing
        routeId={route.id}
        initFormData={{
          name: route.name,
          arrival_time: route.arrival_time,
          departure_time: route.departure_time,
        }}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Stack>
  );
};
