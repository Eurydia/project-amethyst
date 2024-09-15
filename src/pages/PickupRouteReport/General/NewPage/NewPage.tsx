import { postPickupRouteReportGeneral } from "$backend/database/post";
import { PickupRouteReportForm } from "$components/PickupRouteReportForm";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
  const {
    routeSelectOptions,
    initFormData,
    topicComboBoxOptions,
    selectedRoute,
  } = useLoaderData() as NewPageLoaderData;

  const navigate = useNavigate();

  const hasSelectedRoute = selectedRoute !== null;
  const prevPage = hasSelectedRoute
    ? "/pickup-routes/info/" + selectedRoute.id
    : "/pickup-routes/report/general";

  const handleCancle = () => {
    navigate(prevPage, {
      replace: true,
    });
  };

  const handleSubmit = async (
    formData: PickupRouteReportGeneralFormData,
  ) => {
    postPickupRouteReportGeneral(formData).then(
      (reportId) => {
        toast.success("ลงบันทึกสำเร็จ");
        navigate(
          "/pickup-routes/report/general/info/" + reportId,
          {
            replace: true,
          },
        );
      },
      () => {
        toast.error("ลงบันทึกล้มเหลว");
        handleCancle();
      },
    );
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h1">แบบฟอร์ม</Typography>
      <Typography variant="h2">
        ลงบันทึกเรื่องร้องเรียนสายรถ
      </Typography>
      <PickupRouteReportForm
        initFormData={initFormData}
        slotProps={{
          topicComboBox: {
            options: topicComboBoxOptions,
          },
          routeSelect: {
            options: routeSelectOptions,
          },
          submitButton: {
            onClick: handleSubmit,
            startIcon: <AddRounded />,
            label: "ลงบันทึก",
          },
          cancelButton: {
            onClick: handleCancle,
          },
        }}
      />
    </Stack>
  );
};
