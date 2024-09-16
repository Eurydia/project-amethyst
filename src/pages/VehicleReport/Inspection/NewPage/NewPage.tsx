import { postVehicleReportInspection } from "$backend/database/post";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { VehicleReportInspectionForm } from "$components/VehicleReportInspectionForm";
import { VehicleReportInspectionFormData } from "$types/models/vehicle-report-inspection";
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
  const prevPath = hasSelectedVehicle
    ? "/vehicles/info/" + selectedVehicle.id
    : "/vehicles/report/inspection";
  const prevPathLabel = hasSelectedVehicle
    ? "ข้อมูลรถรับส่ง"
    : "ตารางบันทึกผลการตรวจสภาพรถ";
  const navigation = useNavigate();

  const handleCancel = () => {
    navigation(prevPath, {
      replace: true,
    });
  };

  const handleSubmit = async (
    formData: VehicleReportInspectionFormData,
  ) => {
    postVehicleReportInspection(formData)
      .then((reportId) => {
        toast.success("ลงบันทึกสำเร็จ");
        navigation(
          "/vehicles/report/inspection/info" + reportId,
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
      <BaseTypographyLink to={prevPath}>
        <KeyboardArrowLeftRounded />
        {prevPathLabel}
      </BaseTypographyLink>
      <Typography variant="h1">แบบฟอร์ม</Typography>
      <Typography variant="h2">
        ลงบันทึกผลการตรวจสภาพรถ
      </Typography>
      {hasSelectedVehicle && (
        <Typography variant="h3">
          {`${selectedVehicle.license_plate} (${selectedVehicle.vendor})`}
        </Typography>
      )}
      <VehicleReportInspectionForm
        initFormData={initFormData}
        slotProps={{
          submitButton: {
            startIcon: <AddRounded />,
            label: "เพิ่มผลตรวจ",
            onClick: handleSubmit,
          },
          cancelButton: {
            label: "ยกเลิก",
            onClick: handleCancel,
          },
          vehicleSelect: {
            disabled: hasSelectedVehicle,
            options: vehicleSelectOptions,
          },
          topicComboBox: {
            options: topicComboBoxOptions,
          },
        }}
      />
    </Stack>
  );
};
