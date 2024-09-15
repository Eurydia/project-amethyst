import { BaseTOC } from "$components/BaseTOC";
import { DriverInfoGroup } from "$components/DriverInfoGroup";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { TRANSLATION } from "$locale/th";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
  createSearchParams,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

const TOC_ITEMS = [
  {
    label: TRANSLATION.driverInfoGroup,
    href: "#info",
  },
  {
    label: TRANSLATION.operationalLogTable,
    href: "#operational-log",
  },
  {
    label: TRANSLATION.driverGeneralReportTable,
    href: "#general-report",
  },
  {
    label: TRANSLATION.driverMedicalReportTable,
    href: "#medical-report",
  },
];

export const IndexPage: FC = () => {
  const {
    databaseHasNoRoute,
    databaseHasNoVehicle,
    driver,
    galleryDirPath,
    galleryFileEntries,
    logEntries,
    generalEntries,
    medicalEntries,
  } = useLoaderData() as IndexPageLoaderData;
  const navigate = useNavigate();

  return (
    <Stack spacing={1}>
      <Typography variant="h1" id="info">
        {`${driver.name} ${driver.surname}`}
      </Typography>
      <BaseTOC>{TOC_ITEMS}</BaseTOC>
      <Typography variant="h2">
        {`ข้อมูลคนขับรถ`}
      </Typography>
      <DriverInfoGroup
        driver={driver}
        slotProps={{
          editButton: {
            onClick: () => navigate("./edit"),
          },
          gallery: {
            dirPath: galleryDirPath,
            fileEntries: galleryFileEntries,
          },
        }}
      />
      <Typography variant="h2" id="operational-log">
        {TRANSLATION.operationalLogTable}
      </Typography>
      <OperationalLogTable
        entries={logEntries}
        slotProps={{
          addButton: {
            disabled:
              databaseHasNoVehicle || databaseHasNoRoute,
            onClick: () =>
              navigate(
                "/operational-logs/new" +
                  createSearchParams({
                    driverId: driver.id.toString(),
                  }).toString(),
              ),
          },
        }}
      />
      <Typography variant="h2" id="general-report">
        {TRANSLATION.driverGeneralReportTable}
      </Typography>
      <DriverReportGeneralTable
        hideDriverColumn
        entries={generalEntries}
        slotProps={{
          addButton: {
            onClick: () =>
              navigate(
                "/drivres/report/general/new" +
                  createSearchParams({
                    driverId: driver.id.toString(),
                  }).toString(),
              ),
          },
        }}
      />
      <Typography variant="h2" id="medical-report">
        {TRANSLATION.driverMedicalReportTable}
      </Typography>
      <DriverReportMedicalTable
        entries={medicalEntries}
        slotProps={{
          addButton: {
            onClick: () =>
              navigate(
                "/drivers/report/medical/new" +
                  createSearchParams({
                    driverId: driver.id.toString(),
                  }).toString(),
              ),
          },
        }}
      />
    </Stack>
  );
};
