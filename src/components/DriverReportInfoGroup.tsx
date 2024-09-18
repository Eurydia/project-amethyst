import { FormalLayout } from "$layouts/FormalLayout";
import { DriverModel } from "$types/models/driver";
import {
  DriverReportFormData,
  DriverReportModel,
} from "$types/models/driver-report";
import {
  AddRounded,
  SaveRounded,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { DriverReportForm } from "./DriverReportForm";

type DriverReportInfoGroupProps = {
  report: DriverReportModel;
  driver: DriverModel;
  slotProps: {
    form: {
      topicComboBox: {
        options: string[];
      };
      submitButton: {
        onClick: (
          formData: DriverReportFormData,
        ) => Promise<any>;
      };
    };
  };
};
export const DriverReportInfoGroup: FC<
  DriverReportInfoGroupProps
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
          {`${driver.name} ${driver.surname}`}
        </BaseTypographyLink>
      ),
    },
    {
      label: "เวลาและวันที่",
      value: (
        <Typography>
          {dayjs(report.datetime)
            .locale("th")
            .format("HH:mm น. วันddddที่ DD MMMM YYYY")}
        </Typography>
      ),
    },
    {
      label: "เรื่อง",
      value: <Typography>{report.title}</Typography>,
    },
    {
      label: "รายละเอียด",
      value:
        report.content.trim().length > 0 ? (
          <Typography>{report.content}</Typography>
        ) : (
          <Typography fontStyle="italic">
            ไม่มีรายละเอียด
          </Typography>
        ),
    },
    {
      label: "หัวข้อที่เกี่ยวข้อง",
      value:
        report.topics.length > 0 ? (
          <Typography>
            {report.topics.replaceAll(",", ", ")}
          </Typography>
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
      <DriverReportForm
        initFormData={{
          datetime: report.datetime,
          title: report.title,
          content: report.content,
          topics: report.topics.split(","),
          driver,
        }}
        title="แก้ไขเรื่องข้อมูลร้องเรียนคนขับรถ"
        open={dialogOpen}
        onClose={() => setDialogOpen(true)}
        slotProps={{
          submitButton: {
            label: "บันทึกการเปลี่ยนแปลง",
            startIcon: <SaveRounded />,
            onClick: (formData) =>
              slotProps.form.submitButton
                .onClick(formData)
                .finally(() => setDialogOpen(false)),
          },
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
