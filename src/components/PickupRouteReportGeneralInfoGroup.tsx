import { putPickupRouteReportGeneral } from "$backend/database/put";
import { FormalLayout } from "$layouts/FormalLayout";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { SaveRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, Fragment, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { PickupRouteReportGeneralForm } from "./PickupRouteReportGeneralForm";

type PickupRouteReportInfoGroupProps = {
  route: PickupRouteModel;
  report: PickupRouteReportGeneralModel;
  slotProps: {
    form: {
      topicComboBox: { options: string[] };
    };
  };
};
export const PickupRouteReportInfoGroup: FC<
  PickupRouteReportInfoGroupProps
> = (props) => {
  const { report, route, slotProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const { revalidate } = useRevalidator();

  const infoItems = [
    {
      label: "เลขที่เรื่องร้องเรียน",
      value: report.id,
    },
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
      value: report.content,
    },
    {
      label: "หัวข้อที่เกี่ยวข้อง",
      value: report.topics.replaceAll(",", ", "),
    },
  ].map(({ label, value }) => ({
    label,
    value: <Typography>{value}</Typography>,
  }));

  return (
    <Fragment>
      <FormalLayout>{infoItems}</FormalLayout>
      <PickupRouteReportGeneralForm
        initFormData={{
          route,
          content: report.content,
          datetime: report.datetime,
          title: report.title,
          topics: report.topics.split(","),
        }}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          submitButton: {
            startIcon: <SaveRounded />,
            label: "บันทึก",
            onClick: (formData) =>
              putPickupRouteReportGeneral(
                report.id,
                formData,
              ).then(
                () => {
                  toast.success("บันทึกสำเร็จ");
                  revalidate();
                },
                () => toast.error("บันทึกล้มเหลว"),
              ),
          },
          topicComboBox: slotProps.form.topicComboBox,
          routeSelect: {
            disabled: true,
            options: [route],
          },
        }}
      />
    </Fragment>
  );
};
