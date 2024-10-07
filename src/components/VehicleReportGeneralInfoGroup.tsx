import { FormalLayout } from "$layouts/FormalLayout";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralModel } from "$types/models/vehicle-report-general";
import { EditRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { VehicleReportGeneralForm } from "./VehicleReportGeneralForm";

type VehicleReportGeneralInfoGroupProps = {
  report: VehicleReportGeneralModel;
  vehicle: VehicleModel;
  slotProps: {
    form: {
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const VehicleReportGeneralInfoGroup: FC<
  VehicleReportGeneralInfoGroupProps
> = (props) => {
  const { report, vehicle, slotProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const topics = report.topics
    .split(",")
    .map((topic) => topic.trim())
    .filter((topic) => topic.length > 0);

  const infoItems = [
    {
      label: "วันที่ลงบันทึก",
      value: dayjs(report.datetime)
        .locale("th")
        .format("HH:mm น. วันddddที่ DD MMMM YYYY"),
    },
    {
      label: "เลขทะเบียน",
      value: (
        <Link to={"/vehicles/info/" + vehicle.id}>
          {vehicle.license_plate}
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
        startIcon={<EditRounded />}
        onClick={() => setDialogOpen(true)}
      >
        แก้ไขข้อมูล
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>
      <VehicleReportGeneralForm
        editing
        report={report}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          topicComboBox: slotProps.form.topicComboBox,
          vehcleSelect: {
            options: [vehicle],
            disabled: true,
          },
        }}
      />
    </Stack>
  );
};
