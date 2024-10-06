import { FormalLayout } from "$layouts/FormalLayout";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import { EditRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { VehicleReportInspectionForm } from "./VehicleReportInspectionForm";

type VehicleReportInspectionInfoGroupProps = {
  report: VehicleReportInspectionModel;
  vehicle: VehicleModel;
  slotProps: {
    form: {
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const VehicleReportInspectionInfoGroup: FC<
  VehicleReportInspectionInfoGroupProps
> = (props) => {
  const { report, vehicle, slotProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const infoItems = [
    {
      label: "วันที่ลงบันทึก",
      value: dayjs(report.datetime)
        .locale("th")
        .format("HH:mm น. DD MMMM YYYY"),
    },
    {
      label: "เลขทะเบียน",
      value: (
        <BaseTypographyLink
          to={"/vehicles/info/" + vehicle.id}
        >
          {vehicle.license_plate}
        </BaseTypographyLink>
      ),
    },
    {
      label: "กล้องหน้ารถ",
      value: report.front_camera,
    },
    {
      label: "เข็มขัดนิรภัย",
      value: report.seatbelts,
    },
    {
      label: "เบาะและที่นั่ง",
      value: report.seats,
    },
    {
      label: "พัดลม",
      value: report.overhead_fan,
    },
    {
      label: "หน้าต่าง",
      value: report.windows,
    },
    {
      label: "ไฟหน้า",
      value: report.headlights,
    },
    {
      label: "ไฟเบรค",
      value: report.brake_light,
    },
    {
      label: "ไฟเลี้ยว",
      value: report.turn_signals,
    },
    {
      label: "ยาง",
      value: report.tires,
    },
    {
      label: "ตัวรถ",
      value: report.frame,
    },
    {
      label: "กระจกมองหลัง",
      value: report.rearview_mirror,
    },
    {
      label: "กระจกมองข้าง",
      value: report.sideview_mirror,
    },
    {
      label: "รายละเอียดเพิ่มเติม",
      value: report.content.trim() || (
        <Typography fontStyle="italic">
          ไม่มีรายละเอียดเพิ่มเติม
        </Typography>
      ),
    },
  ];

  infoItems.push({
    label: "หัวข้อที่เกี่ยวข้อง",
    value: report.topics
      .split(",")
      .map((topic) => topic.trim())
      .filter((topic) => topic.length > 0)
      .join(", ") || (
      <Typography fontStyle="italic">
        ไม่มีหัวข้อที่เกี่ยวข้อง
      </Typography>
    ),
  });

  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        onClick={() => setDialogOpen(true)}
        startIcon={<EditRounded />}
      >
        แก้ไขข้อมูล
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>
      <VehicleReportInspectionForm
        editing
        report={report}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          form: {
            vehicleSelect: {
              disabled: true,
              options: [vehicle],
            },
            topicComboBox: slotProps.form.topicComboBox,
          },
        }}
      />
    </Stack>
  );
};
