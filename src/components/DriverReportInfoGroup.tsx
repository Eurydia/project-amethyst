import { DriverModel } from "$types/models/driver";
import { DriverReportModel } from "$types/models/driver-report";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { BaseInfoGroup } from "./BaseInfoGroup";
import { BaseTypographyLink } from "./BaseTypographyLink";

type DriverReportInfoGroupProps = {
  report: DriverReportModel;
  driver: DriverModel;
  slotProps: {
    driverLabel: string;
    datetimeLabel: string;
    titleLabel: string;
    contentLabel: string;
    topicLabel: string;
    editButton: {
      label: string;
      onClick: () => void;
    };
  };
};
export const DriverReportInfoGroup: FC<
  DriverReportInfoGroupProps
> = (props) => {
  const { report, driver, slotProps } = props;

  const infoItems = [
    {
      label: slotProps.driverLabel,
      value: (
        <BaseTypographyLink
          toPage={"/drivers/info/" + driver.id}
        >
          {`${driver.name} ${driver.surname}`}
        </BaseTypographyLink>
      ),
    },
    {
      label: slotProps.datetimeLabel,
      value: (
        <Typography>
          {dayjs(report.datetime)
            .locale("th")
            .format("HH:mm น. วันddddที่ DD MMMM YYYY")}
        </Typography>
      ),
    },
    {
      label: slotProps.titleLabel,
      value: <Typography>{report.title}</Typography>,
    },
    {
      label: slotProps.contentLabel,
      value:
        report.content.trim().length > 0 ? (
          <Typography>{report.content}</Typography>
        ) : (
          <Typography fontStyle="italic">
            ไม่มีรายละเอียด
          </Typography>
        ),
    },
    {
      label: slotProps.topicLabel,
      value:
        report.topics.length > 0 ? (
          <Typography>
            {report.topics.replaceAll(",", ", ")}
          </Typography>
        ) : (
          <Typography fontStyle="italic">
            ไม่มีหัวข้อที่เกี่ยวข้อง
          </Typography>
        ),
    },
  ];

  return (
    <BaseInfoGroup
      slotProps={{
        editButton: {
          label: slotProps.editButton.label,
          onClick: slotProps.editButton.onClick,
        },
      }}
    >
      {infoItems}
    </BaseInfoGroup>
  );
};
