import { useEffect, useCallback, RefObject } from 'react'
import { NavigateFunction } from 'react-router-dom'

export const usePortfolioHeader = ({
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

  const moveHome = useCallback(() => {
    navigate('/');
  }, []);

  const moveTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  const moveProject = useCallback(() => {
    projectRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  const moveAbout = useCallback(() => {
    aboutRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return {
    moveHome, moveTop, moveProject, moveAbout
  } as {
    moveHome: typeof moveHome,
    moveTop: typeof moveTop,
    moveProject: typeof moveProject,
    moveAbout: typeof moveAbout,
  };
};

export type UsePortfolioHeader = ReturnType<typeof usePortfolioHeader>;