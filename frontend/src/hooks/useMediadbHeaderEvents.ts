import { NavigateFunction } from "react-router-dom";

export const useMediadbHeaderEvents = ({ navigate }: {
  navigate: NavigateFunction
}) => {

  const events = {
    logout: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      console.log(_event);
    },
    login: () => {
      navigate('/login');
    },
    clickToBack: () => {
      navigate('/');
    },
  };

  return {
    events
  } as {
    events: typeof events;
  }
};

export type MediadbHeaderEvents = ReturnType<typeof useMediadbHeaderEvents>;