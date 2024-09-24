/** @format */

import { FormalLayout } from "$layouts/FormalLayout";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { EditRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { PickupRouteReportGeneralForm } from "./PickupRouteReportGeneralForm";

type PickupRouteReportGeneralInfoGroupProps = {
  route: PickupRouteModel;
  report: PickupRouteReportGeneralModel;
  slotProps: {
    form: {
      topicComboBox: { options: string[] };
    };
  };
};
export const PickupRouteReportGeneralInfoGroup: FC<
  PickupRouteReportGeneralInfoGroupProps
> = (props) => {
  const { report, route, slotProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const infoItems = [
    {
      label: "ร้องเรียนเมื่อ",
      value: dayjs(report.datetime)
        .locale("th")
        .format("HH:mm น. วันddddที่ DD MMMM YYYY"),
    },
    {
      label: "สายรถ",
      value: <Link to={"/pickup-routes/info/" + route.id}>{route.name}</Link>,
    },
    {
      label: "เรื่อง",
      value: report.title,
    },
    {
      label: "รายละเอียด",
      value: report.content,
    },
  ].map(({ label, value }) => ({
    label,
    value: <Typography>{value}</Typography>,
  }));

  infoItems.push({
    label: "หัวข้อที่เกี่ยวข้อง",
    value:
      report.topics.trim().length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{report.topics.replaceAll(",", ", ")}</Typography>
      ),
  });

  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        startIcon={<EditRounded />}
        onClick={() => setDialogOpen(true)}
      >
        แก้ไขข้อมูล
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>
      <PickupRouteReportGeneralForm
        editing
        reportId={report.id}
        initFormData={{
          route,
          content: report.content,
          datetime: report.datetime,
          title: report.title,
          topics: report.topics
            .split(",")
            .map((topic) => topic.trim().normalize())
            .filter((topic) => topic.trim().length > 0),
        }}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          topicComboBox: slotProps.form.topicComboBox,
          routeSelect: {
            disabled: true,
            options: [route],
          },
        }}
      />
    </Stack>
  );
};
