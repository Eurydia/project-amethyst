import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralEntry } from "$types/models/vehicle-report-general";
import { SearchRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { VehicleReportGeneralForm } from "./VehicleReportGeneralForm";

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
        b.vehicleLicensePlate
      ),
    render: (item) => (
      <BaseTypographyLink
        to={"/vehicles/info/" + item.vehicleId}
      >
        {item.vehicleLicensePlate}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "เรื่อง",
    compare: (a, b) => a.title.localeCompare(b.title),
    render: (item) => (
      <BaseTypographyLink
        to={"/vehicles/report/general/info/" + item.id}
      >
        {item.title}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: (item) =>
      item.topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>
          {item.topics
            .map((topic) => topic.normalize().trim())
            .filter((topic) => topic.length > 0)
            .join(", ")}
        </Typography>
      ),
  };

type VehicleReportGeneralTableProps = {
  hideVehicleColumn?: boolean;
  entries: VehicleReportGeneralEntry[];
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
export const VehicleReportGeneralTable: FC<
  VehicleReportGeneralTableProps
> = (props) => {
  const { entries, slotProps, hideVehicleColumn } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
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
        placeholder="ค้นหาด้วยเลขทะเบียน, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง"
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        slotProps={{
          body: {
            // TODO: translate
            emptyText:
              entries.length === 0
                ? "Database is empty"
                : "ไม่พบเรื่องร้องเรียน",
          },
        }}
      />
      {slotProps.form.vehicleSelect.options.length > 0 && (
        <VehicleReportGeneralForm
          editing={false}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          slotProps={{
            // submitButton: {
            //   startIcon: <AddRounded />,
            //   label: "เพิ่มเรื่องร้องเรียน",
            //   onClick: (
            //     formData: VehicleReportGeneralFormData
            //   ) =>
            //     tauriPostVehicleReportGeneral(formData)
            //       .then(
            //         () => {
            //           toast.success(
            //             "เพิ่มเรื่องร้องเรียนสำเร็จ"
            //           );
            //           revalidate();
            //         },
            //         () =>
            //           toast.error(
            //             "เพิ่มเรื่องร้องเรียนล้มเหลว"
            //           )
            //       )
            //       .finally(() => setDialogOpen(false)),
            // },
            topicComboBox: slotProps.form.topicComboBox,
            vehcleSelect: slotProps.form.vehicleSelect,
          }}
        />
      )}
    </Stack>
  );
};
