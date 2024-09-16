import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";
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
      <Typography variant="h1">
        ตารางบันทึกเรื่องร้องเรียนรถรับส่ง
      </Typography>
      <VehicleReportGeneralTable
        entries={reportEntries}
        slotProps={{
          addButton: {
            label: "เพิ่มเรื่องร้องเรียน",
            disabled: databaseHasNoVehicle,
            onClick: () =>
              navigate("/vehicles/report/general/new"),
          },
        }}
      />
    </Stack>
  );
};
