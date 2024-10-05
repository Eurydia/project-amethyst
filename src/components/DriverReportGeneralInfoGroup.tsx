import { FormalLayout } from "$layouts/FormalLayout";
import { DriverModel } from "$types/models/driver";
import { DriverReportModel } from "$types/models/driver-report";
import { AddRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { DriverReportGeneralForm } from "./DriverReportGeneralForm";

type DriverReportGeneralInfoGroupProps = {
  report: DriverReportModel;
  driver: DriverModel;
  slotProps: {
    form: {
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const DriverReportGeneralInfoGroup: FC<
  DriverReportGeneralInfoGroupProps
> = (props) => {
  const { report, driver, slotProps } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const infoItems = [
    {
      label: "คบขับรถ",
      value: (
        <BaseTypographyLink
          to={"/drivers/info/" + driver.id}
        >
          {driver.name} {driver.surname}
        </BaseTypographyLink>
      ),
    },
    {
      label: "ลงบันทึก",
      value: dayjs(report.datetime)
        .locale("th")
        .format("HH:mm น. วันddddที่ DD MMMM YYYY"),
    },
    {
      label: "เรื่อง",
      value: report.title,
    },
    {
      label: "รายละเอียด",
      value: report.content.trim() || (
        <Typography fontStyle="italic">
          ไม่มีรายละเอียด
        </Typography>
      ),
    },
    {
      label: "หัวข้อที่เกี่ยวข้อง",
      value:
        report.topics.length > 0 ? (
          report.topics
            .split(",")
            .map((topic) => topic.trim())
            .filter((topic) => topic.length > 0)
            .join(", ")
        ) : (
          <Typography fontStyle="italic">
            ไม่มีหัวข้อที่เกี่ยวข้อง
          </Typography>
        ),
    },
  ];

  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        startIcon={<AddRounded />}
        onClick={() => setDialogOpen(false)}
      >
        แก้ไขข้อมูล
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>
      <DriverReportGeneralForm
        editing
        report={report}
        open={dialogOpen}
        onClose={() => setDialogOpen(true)}
        slotProps={{
          driverSelect: {
            options: [driver],
            disabled: true,
          },
          topicComboBox: slotProps.form.topicComboBox,
        }}
      />
    </Stack>
  );
};
