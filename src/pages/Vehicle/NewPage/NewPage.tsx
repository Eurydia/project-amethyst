import { postVehicle } from "$backend/database/post";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { VehicleForm } from "$components/VehicleForm";
import { VehicleFormData } from "$types/models/vehicle";
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
  const { initFormData, vendorSelectOptions } =
    useLoaderData() as NewPageLoaderData;
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/vehicles", {
      replace: true,
    });
  };

  const handleSubmit = (formData: VehicleFormData) => {
    postVehicle(formData).then(
      (vehicleId) => {
        toast.success("ลงทะเบียนสำเร็จ");
        navigate("/vehicles/info/" + vehicleId, {
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
      <BaseTypographyLink to="/vehicles">
        <KeyboardArrowLeftRounded />
        ทะเบียนรถรับส่ง
      </BaseTypographyLink>
      <Typography variant="h1">แบบฟอร์ม</Typography>
      <Typography variant="h2">
        ลงทะเบียนรถรับส่ง
      </Typography>
      <VehicleForm
        initFormData={initFormData}
        slotProps={{
          vendorSelect: {
            options: vendorSelectOptions,
          },
          submitButton: {
            startIcon: <AddRounded />,
            label: "เพิ่มรถรับส่ง",
            onClick: handleSubmit,
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
