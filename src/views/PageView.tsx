import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC } from "react";
import {
  Location,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const useStatefulNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (to: string, replace: boolean = false) =>
    navigate(to, {
      replace,
      state: { from: location.pathname },
    });
};

export const PageView: FC = () => {
  const _location: Location<{
    from: string;
  }> = useLocation();
  let label: string | null = null;
  let path: string | null = null;
  switch (_location.state.from) {
    case "/drivers/new":
      label = "Driver list";
      path = "/drivers";
      break;
    case "/vehicles/new":
      label = "Vehicle list";
      path = "/vehicles";
      break;
    case "/pickup-routes/new":
      label = "Pickup route list";
      path = "/pickup-routes";
      break;

    case "/drivers":
    case "/vehicles":
    case "/pickup-routes":
    default:
      label = "หน้าแรก";
      path = "/";
      break;
  }

  return (
    <Stack>
      <BaseTypographyLink toPage={path}>
        <KeyboardArrowLeftRounded />
        {label}
      </BaseTypographyLink>
    </Stack>
  );
};
