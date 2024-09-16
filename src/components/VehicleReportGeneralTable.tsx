import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleReportGeneralEntry } from "$types/models/vehicle-report-general";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";

const DATETIME_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
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
const VEHICLE_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "เลขทะเบียน",
    compare: (a, b) =>
      a.vehicleLicensePlate.localeCompare(
        b.vehicleLicensePlate,
      ),
    render: ({ vehicleId, vehicleLicensePlate }) => (
      <BaseTypographyLink
        to={"/vehicles/info/" + vehicleId}
      >
        {vehicleLicensePlate}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "เรื่อง",
    compare: (a, b) => a.title.localeCompare(b.title),
    render: ({ id, title }) => (
      <BaseTypographyLink
        to={"/vehicles/report/general/info/" + id}
      >
        {title}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
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

type VehicleReportGeneralTableProps = {
  hideVehicleColumn?: boolean;
  entries: VehicleReportGeneralEntry[];
  slotProps: {
    addButton: {
      label: string;
      onClick: () => void;
      disabled?: boolean;
    };
  };
};
export const VehicleReportGeneralTable: FC<
  VehicleReportGeneralTableProps
> = (props) => {
  const { entries, slotProps, hideVehicleColumn } = props;

  const [search, setSearch] = useState("");

  const filteredEntries = filterItems(entries, search, [
    "title",
    "topics",
    "vehicleLicensePlate",
  ]);

  let headers = [
    DATETIME_HEADER_DEFINITION,
    VEHICLE_HEADER_DEFINITION,
    TITLE_HEADER_DEFINITION,
    TOPIC_HEADER_DEFINITION,
  ];
  if (hideVehicleColumn) {
    headers = [
      DATETIME_HEADER_DEFINITION,
      TITLE_HEADER_DEFINITION,
      TOPIC_HEADER_DEFINITION,
    ];
  }

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          exportButton: {
            label: "Export",
            onClick: () => {},
            disabled: true,
          },
          importButton: {
            label: "import",
            onClick: () => {},
            disabled: true,
          },

          addButton: {
            onClick: slotProps.addButton.onClick,
            disabled: slotProps.addButton.disabled,
            label: "เพิ่มเรื่องร้องเรียน",
          },
          searchField: {
            placeholder:
              "ค้นหาด้วยเลขทะเบียน, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
            value: search,
            onChange: setSearch,
          },
        }}
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        slotProps={{
          body: {
            emptyText: "ไม่พบเรื่องร้องเรียน",
          },
        }}
      />
    </Stack>
  );
};
