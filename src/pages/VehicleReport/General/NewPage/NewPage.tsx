import { postVehicleReportGeneral } from "$backend/database/post";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
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
  const {
    vehicleSelectOptions,
    topicComboBoxOptions,
    initFormData,
    selectedVehicle,
  } = useLoaderData() as NewPageLoaderData;

  const hasSelectedVehicle = selectedVehicle !== null;
  const prevPage = hasSelectedVehicle
    ? "/vehicles/info/" + selectedVehicle.id
    : "/vehicles/report/general";
  const prevPageLabel = hasSelectedVehicle
    ? "ข้อมูลรถรับส่ง"
    : "ตารางบันทึกเรื่องร้องเรียนรถรับส่ง";

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(prevPage, {
      replace: true,
    });
  };

  const handleSubmit = async (
    formData: VehicleReportGeneralFormData,
  ) => {
    postVehicleReportGeneral(formData)
      .then((reportId) => {
        toast.success("ลงบันทึกสำเร็จ");
        navigate(
          "/vehicles/report/general/info/" + reportId,
          {
            replace: true,
          },
        );
      })
      .catch(() => {
        toast.error("ลงบันทึกล้มเหลว");
        handleCancel();
      });
  };

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to={prevPage}>
        <KeyboardArrowLeftRounded />
        {prevPageLabel}
      </BaseTypographyLink>
      <Typography variant="h1">แบบฟอร์ม</Typography>
      <Typography variant="h2">
        ลงบันทึกเรื่องร้องเรียนรถรับส่ง
      </Typography>
      {hasSelectedVehicle && (
        <Typography variant="h3">
          {`${selectedVehicle.license_plate} (${selectedVehicle.vendor})`}
        </Typography>
      )}
      <VehicleReportGeneralForm
        initFormData={initFormData}
        slotProps={{
          submitButton: {
            label: "เพิ่มเรื่องร้องเรียน",
            startIcon: <AddRounded />,
            onClick: handleSubmit,
          },
          topicComboBox: {
            options: topicComboBoxOptions,
          },
          vehcleSelect: {
            options: vehicleSelectOptions,
            disabled: hasSelectedVehicle,
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
