import { PickupRouteReportInfoGroup } from "$components/PickupRouteReportInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { PickupRouteReportGeneralInfoPageLoaderData } from "./loader";

export const PickupRouteReportGeneralInfoPage: FC = () => {
  const { report, route, topicComboBoxOptions } =
    useLoaderData() as PickupRouteReportGeneralInfoPageLoaderData;

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography variant="h1">
        เรื่องร้องเรียนสายรถ
      </Typography>
      <Typography variant="h2">รายละเอียด</Typography>
      <PickupRouteReportInfoGroup
        report={report}
        route={route}
        slotProps={{
          form: {
            topicComboBoxOptions,
          },
        }}
      />
    </Stack>
  );
};
