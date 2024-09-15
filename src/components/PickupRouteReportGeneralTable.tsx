import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteReportEntry } from "$types/models/pickup-route";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<PickupRouteReportEntry>[] =
  [
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
    },
    {
      label: "สายรถ",
      compare: (a, b) =>
        a.routeName.localeCompare(b.routeName),
      render: (item) => (
        <Typography>
          <Link to={"/pickup-routes/info/" + item.routeId}>
            {item.routeName}
          </Link>
        </Typography>
      ),
    },
    {
      label: "เรื่อง",
      compare: (a, b) => a.title.localeCompare(b.title),
      render: (item) => (
        <Typography>
          <Link
            to={
              "/pickup-routes/report/general/info/" +
              item.id
            }
          >
            {item.title}
          </Link>
        </Typography>
      ),
    },
    {
      label: "หัวข้อที่เกี่ยวข้อง",
      compare: null,
      render: (item) =>
        item.topics.length === 0 ? (
          <Typography fontWeight="bold">ไม่มี</Typography>
        ) : (
          <Typography>{item.topics.join(", ")}</Typography>
        ),
    },
  ];

type PickupRouteReportGeneralTableProps = {
  entries: PickupRouteReportEntry[];
  slotProps: {
    addButton: {
      disabled?: boolean;
      onClick: () => void;
    };
  };
};
export const PickupRouteReportGeneralTable: FC<
  PickupRouteReportGeneralTableProps
> = (props) => {
  const { entries, slotProps } = props;

  const [search, setSearch] = useState("");
  const filteredEntries = filterItems(entries, search, [
    "title",
    "topics",
    "routeName",
  ]);
  return (
    <BaseSortableTable
      defaultSortByColumn={0}
      defaultSortOrder="desc"
      entries={filteredEntries}
      headers={HEADER_DEFINITIONS}
      slotProps={{
        addButton: {
          disabled: slotProps.addButton.disabled,
          onClick: slotProps.addButton.onClick,
          label: "ลงบันทึก",
        },
        searchField: {
          placeholder:
            "ค้นหาด้วยสายรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
          value: search,
          onChange: setSearch,
        },
      }}
    >
      {formItems}
    </BaseSortableTable>
  );
};
