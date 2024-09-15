import { postPickupRoute } from "$backend/database/post";
import { PickupRouteForm } from "$components/PickupRouteForm";
import { PickupRouteFormData } from "$types/models/pickup-route";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
  const { initFormData } =
    useLoaderData() as NewPageLoaderData;
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/pickup-routes", {
      replace: true,
    });
  };

  const handleSubmit = (formData: PickupRouteFormData) => {
    postPickupRoute(formData)
      .then((routeId) => {
        toast.success("ลงทะเบียนสำเร็จ");
        navigate("/pickup-routes/info/" + routeId, {
          replace: true,
        });
      })
      .catch(() => {
        toast.error("ลงทะเบียนล้มเหลว");
        handleCancel();
      });
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h1">แบบฟอร์ม</Typography>
      <Typography variant="h2">ลงทะเบียนสายรถ</Typography>
      <PickupRouteForm
        initFormData={initFormData}
        slotProps={{
          submitButton: {
            onClick: handleSubmit,
            label: "เพิ่มสายรถ",
            startIcon: <AddRounded />,
          },
          cancelButton: {
            label: "ยกเลิก",
            onClick: handleCancel,
          },
        }}
      />
    </Stack>
  );
};
