import * as Form from '@radix-ui/react-form';
import { styled } from '@stitches/react';
import { useOutletContext } from 'react-router-dom';

interface MediaDBHomeProps {
  events: {

  }
}

const MediaDBHome = () => {
  const { events } = useOutletContext() as MediaDBHomeProps;
  events;
  return (
    <Main>
      <SearchSection>
        <Article>
          <Title>환영합니다!</Title>
        </Article>
        <Article>
          <Description>다양한 영화와, TV 프로그램 및 인물을 찾을 수 있습니다. 지금 검색해 보세요.</Description>
        </Article>
        <Article>
          <Form.Root asChild>
            <FormRoot>
              <Form.Field name='search'>
                <Search type='text' placeholder='영화, TV 프로그램 및 인물...' required />
              </Form.Field>
              <Form.Submit asChild>
                <Submit type='submit'>Search</Submit>
              </Form.Submit>
            </FormRoot>
          </Form.Root>
        </Article>
      </SearchSection>
      <TrendingSection>

      </TrendingSection>
    </Main>
  );
};

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: 'auto',
  minWidth: '1440px',
  minHeight: 'calc(100vh - 5rem)',
  background: '#fafafa',
  '&:nth-of-type(1)': {
    backgroundImage: 'url("/image-cinema-background.png")',
    backgroundSize: 'cover',
  }
});

const SearchSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: '0.4rem',
  position: 'relative',
  top: '5rem',
  width: 'calc(1440px - 2rem)',
  height: '10rem',
  padding: '2rem',
  borderRadius: '1rem',
  backgroundColor: '#ffffff',
});

const Article = styled('article', {
  width: '100%',
});

const Title = styled('h1', {
  fontSize: '2rem'
});

const Description = styled('p', {
  fontSize: '1.4rem',
  fontWeight: 500,
});

const FormRoot = styled('form', {
  display: 'grid',
  gridTemplateColumns: '90% 10%',
});

const Search = styled('input', {
  width: '100%',
  padding: '0.4rem',
  fontSize: '1.1rem',
});

const Submit = styled('button', {
  fontSize: '1.1rem',
});

const TrendingSection = styled('section', {
  position: 'relative',
  top: '10rem',
  width: 'calc(1440px - 2rem)',
  height: '20rem',
  padding: '2rem',
  borderRadius: '1rem',
  backgroundColor: '#ffffff',
});

export default MediaDBHome;