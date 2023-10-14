import { RefObject } from 'react'
import { NavigateFunction } from 'react-router-dom'

export const usePortfolioHeaderEvents = ({
  navigate,
  topRef,
  projectRef,
  aboutRef
}: {
  navigate: NavigateFunction,
  topRef: RefObject<HTMLElement>,
  projectRef: RefObject<HTMLElement>,
  aboutRef: RefObject<HTMLElement>,
}) => {

  const moveHome = () => {
    navigate('/');
  }

  const moveTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'instant' });
  }

  const moveProject = () => {
    projectRef.current?.scrollIntoView({ behavior: 'instant' });
  }

  const moveAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'instant' });
  }

  return {
    moveHome, moveTop, moveProject, moveAbout
  } as {
    moveHome: typeof moveHome,
    moveTop: typeof moveTop,
    moveProject: typeof moveProject,
    moveAbout: typeof moveAbout,
  };
};

export type PortfolioHeaderEvents
  = ReturnType<typeof usePortfolioHeaderEvents>;