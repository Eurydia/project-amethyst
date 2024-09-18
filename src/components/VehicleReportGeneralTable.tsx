import { postVehicleReportGeneral } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleModel } from "$types/models/vehicle";
import {
  VehicleReportGeneralEntry,
  VehicleReportGeneralFormData,
} from "$types/models/vehicle-report-general";
import {
  AddRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
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

  const { revalidate } = useRevalidator();
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
            emptyText: "ไม่พบเรื่องร้องเรียน",
          },
        }}
      />
      {slotProps.form.vehicleSelect.options.length > 0 && (
        <VehicleReportGeneralForm
          initFormData={{
            datetime: dayjs().format(),
            title: "",
            content: "",
            topics: [],
            vehicle:
              slotProps.form.vehicleSelect.options[0],
          }}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="ร้องเรียนรถรับส่ง"
          slotProps={{
            submitButton: {
              startIcon: <AddRounded />,
              label: "เพิ่มเรื่องร้องเรียน",
              onClick: (
                formData: VehicleReportGeneralFormData,
              ) =>
                postVehicleReportGeneral(formData)
                  .then(
                    () => {
                      toast.success(
                        "เพิ่มเรื่องร้องเรียนสำเร็จ",
                      );
                      revalidate();
                    },
                    () =>
                      toast.error(
                        "เพิ่มเรื่องร้องเรียนล้มเหลว",
                      ),
                  )
                  .finally(() => setDialogOpen(false)),
            },
            topicComboBox: slotProps.form.topicComboBox,
            vehcleSelect: slotProps.form.vehicleSelect,
          }}
        />
      )}
    </Stack>
  );
};
