/** @format */

import { tauriPutVehicleReportInspection } from "$backend/database/put";
import { FormalLayout } from "$layouts/FormalLayout";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import {
  EditRounded,
  SaveRounded,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { VehicleReportInspectionForm } from "./VehicleReportInspectionForm";

type VehicleReportInspectionInfoGroupProps = {
  report: VehicleReportInspectionModel;
  vehicle: VehicleModel;
  inspectionRoundNumber: number;
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
  const {
    report,
    inspectionRoundNumber,
    vehicle,
    slotProps,
  } = props;
  const { revalidate } = useRevalidator();
  const [dialogOpen, setDialogOpen] = useState(false);

  const infoItems = [
    {
      label: "รอบการตรวจสภาพ",
      value: inspectionRoundNumber,
    },
    {
      label: "วันที่ลงบันทึก",
      value: dayjs(report.datetime)
        .locale("th")
        .format("HH:mm น. DD MMMM YYYY"),
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
  ].map((item) => ({
    label: item.label,
    value: <Typography>{item.value}</Typography>,
  }));

  infoItems.push({
    label: "รายละเอียดเพิ่มเติม",
    value:
      report.content.trim().length === 0 ? (
        <Typography fontStyle="italic">
          ไม่มีรายละเอียดเพิ่มเติม
        </Typography>
      ) : (
        <Typography>{report.content}</Typography>
      ),
  });

  infoItems.push({
    label: "หัวข้อที่เกี่ยวข้อง",
    value:
      report.topics.length === 0 ? (
        <Typography fontStyle="italic">
          ไม่มีหัวข้อที่เกี่ยวข้อง
        </Typography>
      ) : (
        <Typography>
          {report.topics.replaceAll(",", ", ")}
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
        แก้ไข
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>
      <VehicleReportInspectionForm
        initFormData={{
          datetime: report.datetime,
          content: report.content,
          topics: [],
          vehicle,
          frontCamera: report.front_camera,
          overheadFan: report.overhead_fan,
          windows: report.windows,
          frame: report.frame,
          seatbelts: report.seatbelts,
          seats: report.seats,
          headlights: report.headlights,
          turnSignals: report.turn_signals,
          brakeLight: report.brake_light,
          rearviewMirror: report.rearview_mirror,
          sideviewMirror: report.sideview_mirror,
          tires: report.tires,
        }}
        open={dialogOpen}
        title="แก้ไขข้อมูลการตรวจสภาพรถ"
        onClose={() => setDialogOpen(false)}
        slotProps={{
          submitButton: {
            label: "บันทึกการเปลี่ยนแปลง",
            startIcon: <SaveRounded />,
            onClick: (formData) =>
              tauriPutVehicleReportInspection(
                report.id,
                formData
              )
                .then(
                  () => {
                    toast.success(
                      "บันทึกการเปลี่ยนแปลงสำเร็จ"
                    );
                    revalidate();
                  },
                  () =>
                    toast.error(
                      "บันทึกการเปลี่ยนแปลงล้มเหลว"
                    )
                )
                .finally(() => setDialogOpen(false)),
          },
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
