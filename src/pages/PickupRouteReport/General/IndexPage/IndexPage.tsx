import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
  const { reportEntries, databaseHasNoRoute } =
    useLoaderData() as IndexPageLoaderData;
  const navigate = useNavigate();

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/">
        <KeyboardArrowLeftRounded />
        หน้าแรก
      </BaseTypographyLink>
      <Typography variant="h1">
        ตารางบันทึกเรื่องร้องเรียนสายรถ
      </Typography>
      <PickupRouteReportGeneralTable
        entries={reportEntries}
        slotProps={{
          addButton: {
            disabled: databaseHasNoRoute,
            onClick: () => navigate("./new"),
          },
        }}
      />
    </Stack>
  );
};
