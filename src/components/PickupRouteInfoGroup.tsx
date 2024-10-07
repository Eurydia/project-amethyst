import { FormalLayout } from "$layouts/FormalLayout";
import { PickupRouteModel } from "$types/models/pickup-route";
import { EditRounded } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
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
      label: "รหัส",
      value: route.id,
    },    {
      label: "ชื่อสาย",
      value: route.name,
    },
    {
      label: "เวลารับเข้า",
      value: dayjs(route.arrival_time, "HH:mm").format(
        "HH:mm น."
      ),
    },
    {
      label: "เวลารับออก",
      value: dayjs(route.departure_time, "HH:mm").format(
        "HH:mm น."
      ),
    },
  ];

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
        route={route}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Stack>
  );
};
