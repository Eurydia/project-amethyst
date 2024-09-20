import { postPickupRouteReportGeneral } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralEntry } from "$types/models/pickup-route-report-general";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseInputFileDropzone } from "./BaseInputFileDropzone";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { PickupRouteReportGeneralForm } from "./PickupRouteReportGeneralForm";

const DATETIME_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
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
const ROUTE_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "สายรถ",
    compare: (a, b) =>
      a.routeName.localeCompare(b.routeName),
    render: (item) => (
      <BaseTypographyLink
        to={"/pickup-routes/info/" + item.routeId}
      >
        {item.routeName}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "เรื่อง",
    compare: (a, b) => a.title.localeCompare(b.title),
    render: (item) => (
      <BaseTypographyLink
        to={"/pickup-routes/report/general/info/" + item.id}
      >
        {item.title}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: (item) =>
      item.topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{item.topics.join(", ")}</Typography>
      ),
  };

type PickupRouteReportGeneralTableProps = {
  hideRouteColumn?: boolean;
  entries: PickupRouteReportGeneralEntry[];
  slotProps: {
    form: {
      routeSelect: {
        disabled?: boolean;
        options: PickupRouteModel[];
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const PickupRouteReportGeneralTable: FC<
  PickupRouteReportGeneralTableProps
> = (props) => {
  const { entries, hideRouteColumn, slotProps } = props;
  const { revalidate } = useRevalidator();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredEntries = filterItems(entries, search, [
    "title",
    "topics",
    "routeName",
  ]);

  let headers = [
    DATETIME_HEADER_DEFINITION,
    ROUTE_HEADER_DEFINITION,
    TITLE_HEADER_DEFINITION,
    TOPIC_HEADER_DEFINITION,
  ];
  if (hideRouteColumn) {
    headers = [
      DATETIME_HEADER_DEFINITION,
      TITLE_HEADER_DEFINITION,
      TOPIC_HEADER_DEFINITION,
    ];
  }

  const databaseHasNotRoute =
    slotProps.form.routeSelect.options.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          importButton: {
            disabled: databaseHasNotRoute,
            children: "เพิ่มสายรถจากไฟล์",
          },
          exportButton: {},
          addButton: {
            children: "เพิ่มเรื่องร้องเรียน",
            disabled: databaseHasNotRoute,
            onClick: () => setDialogOpen(true),
            reason: "ไม่มีสายรถในระบบ",
          },
          searchField: {
            placeholder:
              "ค้นหาด้วยสายรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
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
      {!databaseHasNotRoute && (
        <PickupRouteReportGeneralForm
          initFormData={{
            route: slotProps.form.routeSelect.options[0],
            datetime: dayjs().format(),
            title: "",
            content: "",
            topics: [],
          }}
          slotProps={{
            submitButton: {
              startIcon: <AddRounded />,
              label: "เพิ่มเรื่องร้องเรียน",
              onClick: (formData) =>
                postPickupRouteReportGeneral(formData)
                  .then(
                    () => {
                      toast.success("สำเร็จ");
                      revalidate();
                    },
                    () => toast.error("ล้มเหลว"),
                  )
                  .finally(() => setDialogOpen(false)),
            },
            topicComboBox: slotProps.form.topicComboBox,
            routeSelect: slotProps.form.routeSelect,
          }}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
      <BaseInputFileDropzone />
    </Stack>
  );
};
