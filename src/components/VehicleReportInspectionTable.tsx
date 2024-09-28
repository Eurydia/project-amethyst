/** @format */

import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionEntry } from "$types/models/vehicle-report-inspection";
import { SearchRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { VehicleReportInspectionForm } from "./VehicleReportInspectionForm";

const DATETIME_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "เวลาและวันที่",
    compare: (a, b) =>
      dayjs(a.datetime).unix() - dayjs(b.datetime).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.datetime)
          .locale("th")
          .format("HH:mm น. DD MMMM YYYY")}
      </Typography>
    ),
  };
const VEHICLE_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "เลขทะเบียนรถ",
    compare: (a, b) =>
      a.vehicleLicensePlate.localeCompare(
        b.vehicleLicensePlate
      ),
    render: ({ vehicleId, vehicleLicensePlate }) => (
      <BaseTypographyLink
        to={"/vehicles/info/" + vehicleId}
      >
        {vehicleLicensePlate}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "รอบการตรวจสภาพรถ",
    compare: (a, b) =>
      a.inspectionRoundNumber - b.inspectionRoundNumber,
    render: ({ inspectionRoundNumber, id }) => (
      <BaseTypographyLink
        to={"/vehicles/report/inspection/info/" + id}
      >
        {`รอบที่ ${inspectionRoundNumber}`}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: ({ topics }) =>
      topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{topics.join(", ")}</Typography>
      ),
  };

type VehicleReportInspectionTableProps = {
  hideVehicleColumn?: boolean;
  entries: VehicleReportInspectionEntry[];
  slotProps: {
    form: {
      vehicleSelect: {
        disabled?: boolean;
        options: VehicleModel[];
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const VehicleReportInspectionTable: FC<
  VehicleReportInspectionTableProps
> = (props) => {
  const { slotProps, entries, hideVehicleColumn } = props;

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredEntries = filterItems(entries, search, [
    "title",
    "topics",
    "vehicleLicensePlate",
    "inspectionRoundNumber",
  ]);

  let headers = [
    DATETIME_HEADER,
    VEHICLE_HEADER,
    TITLE_HEADER,
    TOPIC_HEADER,
  ];
  if (hideVehicleColumn) {
    headers = [DATETIME_HEADER, TITLE_HEADER, TOPIC_HEADER];
  }

  return (
    <Stack spacing={1}>
      <Stack direction="row">
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          เพิ่มเรื่องร้องเรียน
        </Button>
      </Stack>
      <BaseInputTextField
        startIcon={<SearchRounded />}
        onChange={setSearch}
        value={search}
        placeholder="ค้นหาด้วยเลขทะเบียน, รอบการตรวจ หรือหัวข้อที่เกี่ยวข้อง"
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        slotProps={{
          body: {
            emptyText: "ไม่พบผลตรวจสภาพรถ",
          },
        }}
      />
      {slotProps.form.vehicleSelect.options.length > 0 && (
        <VehicleReportInspectionForm
          editing={false}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          slotProps={{
            form: {
              topicComboBox: slotProps.form.topicComboBox,
              vehicleSelect: slotProps.form.vehicleSelect,
            },
          }}
        />
      )}
    </Stack>
  );
};
