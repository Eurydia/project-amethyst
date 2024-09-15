import { DriverReportInfoGroup } from "$components/DriverReportInfoGroup";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
  const { report, driver } =
    useLoaderData() as InfoPageLoaderData;
  const submit = useSubmit();

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        {`${driver.name} ${driver.surname}`}
      </Typography>
      <Typography variant="h2">
        {`รายละเอียดเรื่องร้องเรียนคนขับรถ`}
      </Typography>
      <DriverReportInfoGroup
        report={report}
        driver={driver}
        slotProps={{
          editButton: {
            onClick: () =>
              submit(
                {},
                {
                  action: "./edit",
                },
              ),
          },
        }}
      />
    </Stack>
  );
};
