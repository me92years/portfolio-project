import * as React from 'react';
import { styled } from '@stitches/react'

interface PortfolioAboutProps {

};

const PortfolioAbout = React.forwardRef(
  (props: PortfolioAboutProps, ref: React.Ref<HTMLElement>) => {
    props;
    return (
      <Main ref={ref}>
        about
      </Main>
    )
  });

const Main = styled('main', {
  width: '100%',
  height: '100vh',
  minWidth: '1440px',
  background: 'coral',
});

export default PortfolioAbout;