import { postDriverReportGeneral } from "$backend/database/post";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/driver-report";
import {
  AddRounded,
  KeyboardArrowLeftRounded,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import {
  Link,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
  const {
    selectedDriver,
    driverSelectOptions,
    topicComboBoxOptions,
    initFormData,
  } = useLoaderData() as NewPageLoaderData;

  const submit = useSubmit();

  const hasSelectedDriver = selectedDriver !== null;
  const action = hasSelectedDriver
    ? `/drivers/info/` + selectedDriver.id
    : `/drivers/report/medical`;

  const handleCancel = () => {
    submit(
      {},
      {
        replace: true,
        action,
      },
    );
  };

  const handleSubmit = async (
    formData: DriverReportFormData,
  ) => {
    postDriverReportGeneral(formData).then(
      (reportId) => {
        toast.success("ลงบันทึกสำเร็จ");
        submit(
          {},
          {
            replace: true,
            action:
              "/drivers/report/medical/info/" + reportId,
          },
        );
      },
      () => {
        toast.error(`ลงบันทึกล้มเหลว`);
        handleCancel();
      },
    );
  };

  let heading: ReactNode = (
    <Typography variant="h1">
      แบบฟอร์มลงบันทึกผลการตรวจสารเสพติด
    </Typography>
  );
  if (hasSelectedDriver) {
    heading = (
      <Fragment>
        <Typography variant="h1">
          {`${selectedDriver.name} ${selectedDriver.surname}`}
        </Typography>
        <Typography variant="h2">
          แบบฟอร์มลงบันทึกผลการตรวจสารเสพติด
        </Typography>
      </Fragment>
    );
  }

  const backButtonLabel = hasSelectedDriver
    ? "ข้อมูลคนขับรถ"
    : "ตารางบันทึกเรื่องร้องเรียนคนขับรถ";

  return (
    <Stack spacing={1}>
      <Typography component={Link} to={action}>
        <KeyboardArrowLeftRounded />
        {backButtonLabel}
      </Typography>
      {heading}
      <DriverReportForm
        initFormData={initFormData}
        slotProps={{
          dateField: {
            label: "วัน/เดือน/ปี",
          },
          timeField: {
            label: "เวลา",
          },
          titleField: {
            label: "ชื่อเรื่อง",
          },
          contentField: {
            label: "รายละเอียด",
          },
          driverSelect: {
            label: "ผู้ที่ถูกตรวจ",
            disabled: hasSelectedDriver,
            options: driverSelectOptions,
          },
          topicComboBox: {
            label: "หัวข้อที่เกี่ยว",
            options: topicComboBoxOptions,
          },
          submitButton: {
            startIcon: <AddRounded />,
            label: `เพิ่ม`,
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
