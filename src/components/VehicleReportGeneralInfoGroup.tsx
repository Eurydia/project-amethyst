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
      value: report.content,
    },
  ].map(({ label, value }) => ({
    label,
    value: <Typography>{value}</Typography>,
  }));

  infoItems.push({
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
  });

  return (
    <Stack spacing={1}>
      <Button
        variant="outlined"
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
