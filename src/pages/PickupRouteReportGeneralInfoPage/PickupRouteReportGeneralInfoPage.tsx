import { PickupRouteReportInfoGroup } from "$components/PickupRouteReportGeneralInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { PickupRouteReportGeneralInfoPageLoaderData } from "./loader";

export const PickupRouteReportGeneralInfoPage: FC = () => {
  const { report, route, topicComboBoxOptions } =
    useLoaderData() as PickupRouteReportGeneralInfoPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography
        variant="h1"
        sx={{ wordBreak: "keep-all", wordWrap: "normal" }}
      >
        เรื่องร้องเรียนสายรถ
      </Typography>
      <PickupRouteReportInfoGroup
        report={report}
        route={route}
        slotProps={{
          form: {
            topicComboBox: {
              options: topicComboBoxOptions,
            },
          },
        }}
      />
    </Stack>
  );
};
