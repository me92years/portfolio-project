import { useLazyLogoutQuery } from "../app/api";

export const useLogout = () => {
  const [useLogout, { isLoading }] = useLazyLogoutQuery();
  return [useLogout, isLoading] as [typeof useLogout, boolean];
}