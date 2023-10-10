import { useLazyAuthQuery } from "../app/api";

export const useAuth = () => {
  const [getAuth, { data }] = useLazyAuthQuery();
  return [getAuth, data] as [typeof getAuth, typeof data];
};