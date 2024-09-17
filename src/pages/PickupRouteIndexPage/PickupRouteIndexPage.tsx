import { postPickupRoute } from "$backend/database/post";
import { PickupRouteForm } from "$components/PickupRouteForm";
import { PickupRouteTable } from "$components/PickupRouteTable";
import { AddRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
  useLoaderData,
  useRevalidator,
} from "react-router-dom";
import { toast } from "react-toastify";
import { PickupRouteIndexPageLoaderData } from "./loader";

export const PickupRouteIndexPage: FC = () => {
  const { routeEntries, initFormData } =
    useLoaderData() as PickupRouteIndexPageLoaderData;
  const { revalidate } = useRevalidator();

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Stack spacing={1}>
      <Typography variant="h1">รายชื่อสายรถ</Typography>
      <Stack
        useFlexGap
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => setAddDialogOpen(true)}
        >
          เพิ่มสายรถ
        </Button>
      </Stack>
      <PickupRouteTable routeEntries={routeEntries} />
      <PickupRouteForm
        title="ลงทะเบียนสายรถ"
        open={addDialogOpen}
        initFormData={initFormData}
        onClose={() => setAddDialogOpen(false)}
        slotProps={{
          submitButton: {
            label: "เพิ่มสายรถ",
            startIcon: <AddRounded />,
            onClick: (formData) =>
              postPickupRoute(formData)
                .then(
                  () => {
                    toast.success("สำเร็จ");
                    revalidate();
                  },
                  () => toast.error("ล้มเหลว"),
                )
                .finally(() => setAddDialogOpen(false)),
          },
        }}
      />
    </Stack>
  );
};
