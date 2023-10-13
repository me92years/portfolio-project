import { styled } from "@stitches/react";

export const MainWrap = styled('main', {
  width: '100%',
});

export const SectionWrap = styled('section', {
  width: '100%',
  minWidth: '1440px',
  minHeight: '100vh',
  '&.first': {
    paddingTop: '5rem',
    minHeight: 'calc(100vh - 5rem)',
  }
});