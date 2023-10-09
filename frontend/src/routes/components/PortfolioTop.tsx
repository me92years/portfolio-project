import * as React from 'react';
import { styled } from '@stitches/react';

interface PortFolioTopProps {

}

const PortfolioTop = React.forwardRef(
  (_props: PortFolioTopProps, ref: React.Ref<HTMLElement>) => {

    return (
      <Main ref={ref}>
        test
      </Main>
    );
  })

const Main = styled('main', {
  width: '100%',
  height: '100vh',
  minWidth: '1440px',
  background: 'gray',
});

export default PortfolioTop;