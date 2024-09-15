import { DriverReportInfoGroup } from "$components/DriverReportInfoGroup";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
  Link,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
  const { report, driver } =
    useLoaderData() as InfoPageLoaderData;
  const submit = useSubmit();
  return (
    <Stack spacing={1}>
      <Typography
        component={Link}
        to="/drivers/report/medical"
      >
        <KeyboardArrowLeftRounded />
        ตารางบันทึกผลการตรวจสารเสพติด
      </Typography>
      <Typography variant="h1">
        {`${driver.name} ${driver.surname}`}
      </Typography>
      <Typography typography="h2">
        ผลการตรวจสารเสพติด
      </Typography>
      <DriverReportInfoGroup
        report={report}
        driver={driver}
        slotProps={{
          editButton: {
            label: "แก้ไข",
            onClick: () =>
              submit(
                {},
                {
                  replace: true,
                  action: "./edit",
                },
              ),
          },
        }}
      />
    </Stack>
  );
};
