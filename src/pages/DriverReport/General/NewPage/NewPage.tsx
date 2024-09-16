import { postDriverReportGeneral } from "$backend/database/post";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/driver-report";
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
    selectedDriver,
    driverSelectOptions,
    topicOptions,
    initFormData,
  } = useLoaderData() as NewPageLoaderData;

  const navigate = useNavigate();

  const hasSelectedDriver = selectedDriver !== null;
  const prevPage = hasSelectedDriver
    ? "/drivers/info/" + selectedDriver.id
    : "/drivers/report/general";
  const prevPageLabel = hasSelectedDriver
    ? "ข้อมูลคนขับรถ"
    : "ตารางบันทึกเรื่องร้องเรียนคนขับรถ";

  const handleCancel = () => {
    navigate(prevPage, {
      replace: true,
    });
  };

  const handleSubmit = async (
    formData: DriverReportFormData,
  ) => {
    postDriverReportGeneral(formData)
      .then((reportId) => {
        toast.success("ลงบันทึกสำเร็จ");
        navigate(
          "/drivers/report/general/info/" + reportId,
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
        ลงบันทึกเรื่องร้องเรียนคนขับรถ
      </Typography>
      {hasSelectedDriver && (
        <Typography variant="h3">
          {`${selectedDriver.name} ${selectedDriver.surname}`}
        </Typography>
      )}
      <DriverReportForm
        initFormData={initFormData}
        slotProps={{
          timeField: {
            label: "เวลา",
          },
          dateField: {
            label: "วัน/เดือน/ปี",
          },
          titleField: {
            label: "ชื่อเรื่อง",
          },
          contentField: {
            label: "รายละเอียด",
          },
          driverSelect: {
            label: "ผู้ที่ถูกร้องเรียน",
            disabled: hasSelectedDriver,
            options: driverSelectOptions,
          },
          topicComboBox: {
            label: "หัวข้อที่เกี่ยวข้อง",
            options: topicOptions,
          },
          submitButton: {
            label: "เพิ่ม",
            startIcon: <AddRounded />,
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
