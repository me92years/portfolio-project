import * as React from 'react'
import { Route, Routes } from "react-router-dom";
import PortfolioHeader from "./components/PortfolioHeader";
import PortfolioTop from "./components/PortfolioTop";
import PortfolioProject from './components/PortfolioProject';
import PortfolioAbout from './components/PortfolioAbout';


function PortfolioRoutes() {
  const [currentTop, setCurrentTop] = React.useState<number>(0);
  const topElRef = React.useRef<HTMLElement>(null);
  const projectElRef = React.useRef<HTMLElement>(null);
  const aboutElRef = React.useRef<HTMLElement>(null);

  const events = {
    onClickTopLi: () => {
      topElRef.current?.scrollIntoView({ behavior: 'instant' });
    },
    onClickProjectLi: () => {
      projectElRef.current?.scrollIntoView({ behavior: 'instant' });
    },
    onClickAboutLi: () => {
      aboutElRef.current?.scrollIntoView({ behavior: 'instant' });
    }
  };

  let lastScrollTop = 0;
  const handleScroll = (event: Event) => {
    event.preventDefault();
    const scrollTop = window.scrollY;
    if (scrollTop < lastScrollTop) {
      setCurrentTop(scrollY);
    }
    lastScrollTop = scrollTop;
  };

  React.useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => {
      removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Routes>
      // 포트폴리오 사이트
      <Route path='/' element={
        <>
          <PortfolioHeader currentTop={currentTop} events={events} />
          <PortfolioTop ref={topElRef} />
          <PortfolioProject ref={projectElRef} />
          <PortfolioAbout ref={aboutElRef} />
        </>
      } />
    </Routes>
  )
}

export default PortfolioRoutes;