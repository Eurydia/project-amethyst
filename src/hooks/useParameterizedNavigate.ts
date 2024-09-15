import {
  createSearchParams,
  useNavigate,
} from "react-router-dom";

export const useParameterizedNavigate = () => {
  const navigate = useNavigate();
  const parameterizedNavigate = (
    to: string,
    params: Record<string, string> | undefined,
  ) => {
    let searchParams = "";
    if (params !== undefined) {
      searchParams = createSearchParams(
        Object.entries(params),
      ).toString();
    }
    navigate(to + searchParams);
  };

  return parameterizedNavigate;
};
