import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolioHeader } from "../hooks/usePortfolioHeader";
import { MainWrap } from "../components/common/MainObject";
import PortfolioHeader from "../components/header/PortfolioHeader";
import PortfolioTop from "../components/main/PortfolioTop";
import PortfolioProject from "../components/main/PortfolioProject";
import PortfolioAbout from "../components/main/PortfolioAbout";

const PortfolioPage = () => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLElement>(null);
  const projectRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const headerEvents = usePortfolioHeader(
    { navigate, topRef, projectRef, aboutRef });

  return (
    <>
      <PortfolioHeader ref={headerRef} events={headerEvents} />
      <MainWrap>
        <PortfolioTop ref={topRef} />
        <PortfolioProject ref={projectRef} />
        <PortfolioAbout ref={aboutRef} />
      </MainWrap>
    </>
  );
};

export default PortfolioPage;