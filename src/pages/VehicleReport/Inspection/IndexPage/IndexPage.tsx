import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { VehicleReportInspectionTable } from "$components/VehicleReportInspectionTable";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
  const { reportEntries, databaseHasNoVehicle } =
    useLoaderData() as IndexPageLoaderData;

  const navigate = useNavigate();

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/">
        <KeyboardArrowLeftRounded />
        หน้าแรก
      </BaseTypographyLink>
      <Typography variant="h1">
        ตารางบันทึกผลการตรวจสภาพรถ
      </Typography>
      <VehicleReportInspectionTable
        entries={reportEntries}
        slotProps={{
          addButton: {
            disabled: databaseHasNoVehicle,
            onClick: () => navigate("./new"),
          },
        }}
      />
    </Stack>
  );
};
