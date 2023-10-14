import { styled } from "@stitches/react";

export const HeaderWrap = styled('header', {
  display: 'block',
  position: 'absolute',
  inset: 0,
  width: '100%',
  minWidth: '1440px',
  height: '5rem',
  background: '#fafafa',
});

export const Nav = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
});

export const Logo = styled('h1', {
  '&>button': {
    cursor: 'pointer',
    fontSize: '1.3rem',
    fontWeight: '800',
  }
})

export const NavUl = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  columnGap: '1rem',
  listStyleType: 'none',
  '&:last-of-type': {
    marginRight: '2rem'
  }
});

export const NavLi = styled('li', {
});

export const NavButton = styled('button', {
  border: 'none',
  background: 'none',
  fontSize: '1.3rem',
}); 