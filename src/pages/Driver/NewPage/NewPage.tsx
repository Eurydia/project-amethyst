import { postDriver } from "$backend/database/post";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/driver";
import {
  AddRounded,
  KeyboardArrowLeftRounded,
} from "@mui/icons-material";
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
    navigate("/drivers", {
      replace: true,
    });
  };

  const handleSubmit = (formData: DriverFormData) => {
    postDriver(formData).then(
      (driverId) => {
        toast.success("ลงทะเบียนสำเร็จ");
        navigate("/drivers/info/" + driverId, {
          replace: true,
        });
      },
      () => {
        toast.error("ลงทะเบียนล้มเหลว");
        handleCancel();
      },
    );
  };

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/drivers">
        <KeyboardArrowLeftRounded />
        รายชื่อคนขับรถ
      </BaseTypographyLink>
      <Typography variant="h1">แบบฟอร์ม</Typography>
      <Typography variant="h2">ลงทะเบียนคนขับรถ</Typography>
      <DriverForm
        initFormData={initFormData}
        slotProps={{
          submitButton: {
            startIcon: <AddRounded />,
            onClick: handleSubmit,
            label: "เพิ่มคนขับรถ",
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
