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
  const topics = report.topics
    .normalize()
    .split(",")
    .map((topic) => topic.trim())
    .filter((topic) => topic.length > 0);

  const infoItems = [
    {
      label: "บันทึกเมื่อ",
      value: dayjs(report.datetime)
        .locale("th")
        .format("HH:mm น. วันddddที่ DD MMMM YYYY"),
    },
    {
      label: "สายรถ",
      value: (
        <Link to={"/pickup-routes/info/" + route.id}>
          {route.name}
        </Link>
      ),
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
        topics.length > 0 ? (
          topics.join(", ")
        ) : (
          <Typography fontStyle="italic">ไม่มี</Typography>
        ),
    },
  ];

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
        report={report}
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
