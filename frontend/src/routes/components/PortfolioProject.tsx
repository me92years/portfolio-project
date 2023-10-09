import * as React from 'react';
import { styled } from '@stitches/react'

interface PortfolioProjectProps {

};

const PortfolioProject = React.forwardRef(
  (props: PortfolioProjectProps, ref: React.Ref<HTMLElement>) => {
    props;
    return (
      <Main ref={ref}>
        Project
      </Main>
    )
  });

const Main = styled('main', {
  width: '100%',
  height: '100vh',
  minWidth: '1440px',
  background: 'AliceBlue',
});

export default PortfolioProject;