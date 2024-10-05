import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

export const ErrorPage: FC = () => {
  const error = useRouteError();

  let statusText = "เกิดข้อผิดพลาด";
  if (isRouteErrorResponse(error)) {
    statusText = error.statusText;
  }

  console.log(error);

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/">
        <KeyboardArrowLeftRounded />
        หน้าแรก
      </BaseTypographyLink>
      <Typography variant="h1">เกิดข้อผิดพลาด</Typography>
      <Typography variant="h2">{statusText}</Typography>
    </Stack>
  );
};
