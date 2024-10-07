import { tauriPutAttendanceLog } from "$backend/database/put";
import { AttendanceLogEntry } from "$types/models/attendance-log";
import {
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";
import { useRevalidator } from "react-router-dom";

type AttendanceLogTableCheckBoxProps = {
  mode: "arrival" | "departure";
  log: AttendanceLogEntry;
};
export const AttendanceLogTableCheckBox: FC<
  AttendanceLogTableCheckBoxProps
> = (props) => {
  const { mode, log } = props;

  const label = mode === "arrival" ? "รับเข้า" : "รับออก";
  const actual =
    mode === "arrival"
      ? log.actual_arrival_datetime
      : log.actual_departure_datetime;
  const expected =
    mode === "arrival"
      ? log.expected_arrival_datetime
      : log.expected_departure_datetime;

  const { revalidate } = useRevalidator();

  const handleClick = async () => {
    if (isChecked) {
      return;
    }
    (mode === "arrival"
      ? tauriPutAttendanceLog({
          id: log.id,
          actual_arrival_datetime: dayjs().format(),
          actual_departure_datetime:
            log.actual_departure_datetime,
        })
      : tauriPutAttendanceLog({
          id: log.id,
          actual_arrival_datetime:
            log.actual_arrival_datetime,
          actual_departure_datetime: dayjs().format(),
        })
    ).then(revalidate);
  };

  const isChecked = actual !== null;

  let _label = label;
  let lateBy: ReactNode = null;
  if (isChecked) {
    const actualDatetime = dayjs(actual);
    const expectedDatetime = dayjs(expected);
    _label = actualDatetime.format("HH:mm น.");
    if (actualDatetime.isAfter(expectedDatetime)) {
      const lateByAmount = expectedDatetime
        .locale("th")
        .from(actual, true);
      lateBy = (
        <Typography color="error">
          สายไป {lateByAmount}
        </Typography>
      );
    }
  }

  return (
    <Stack>
      <FormControlLabel
        disableTypography
        checked={isChecked}
        disabled={isChecked}
        onClick={handleClick}
        label={<Typography>{_label}</Typography>}
        control={<Checkbox />}
      />
      {lateBy}
    </Stack>
  );
};
