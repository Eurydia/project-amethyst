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
  onClick: () => Promise<any>;
  label: string;
  actual: string | null;
  expected: string;
};
export const AttendanceLogTableCheckBox: FC<
  AttendanceLogTableCheckBoxProps
> = (props) => {
  const { actual, label, expected, onClick } = props;

  const { revalidate } = useRevalidator();

  const handleClick = async () => {
    if (isChecked) {
      return;
    }
    await onClick().then(revalidate);
  };

  const isChecked = actual !== null;

  let _label = label;
  let lateBy: ReactNode = null;
  if (isChecked) {
    const actualDatetime = dayjs(actual);
    const expectedDatetime = dayjs(expected);
    _label = actualDatetime.format("HH:mm น.");
    if (actualDatetime.isAfter(expectedDatetime)) {
      const lateByLabel = expectedDatetime
        .locale("th")
        .from(actual, true);
      lateBy = (
        <Typography
          color="error"
          fontWeight="bold"
        >
          {`สายไป ${lateByLabel}`}
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
