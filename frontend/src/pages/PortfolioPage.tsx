import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolioHeaderEvents } from "../hooks/usePortfolioHeaderEvents";
import { MainWrap } from "../components/common/MainObject";
import PortfolioHeader from "../components/header/PortfolioHeader";
import PortfolioTop from "../components/main/portfolio/PortfolioTop";
import PortfolioProject from "../components/main/portfolio/PortfolioProject";
import PortfolioAbout from "../components/main/portfolio/PortfolioAbout";

const PortfolioPage = () => {
  const navigate = useNavigate();
  const topRef = useRef<HTMLElement>(null);
  const projectRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const headerEvents = usePortfolioHeaderEvents(
    { navigate, topRef, projectRef, aboutRef });
  return (
    <>
      <PortfolioHeader events={headerEvents} />
      <MainWrap>
        <PortfolioTop ref={topRef} />
        <PortfolioProject ref={projectRef} />
        <PortfolioAbout ref={aboutRef} />
      </MainWrap>
    </>
  );
};

export default PortfolioPage;