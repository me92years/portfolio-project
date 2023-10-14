import * as Form from "@radix-ui/react-form";
import { styled } from "@stitches/react";
import { MainWrap, InputText } from "../../common/MainObject";
import { LoginEvents } from "../../../hooks/useLoginEvents";
import { LoginRequest } from "../../../features/login/loginSlice";
import styles from './LoginHome.module.css';
import { Loading } from "../../common/Loading";

const LoginHome = ({
  loginEvents,
  loginRequest,
}: {
  loginEvents: LoginEvents,
  loginRequest: LoginRequest
}) => {
  const { events, status } = loginEvents;

  return (
    <>
      {status.loginLoading ? <Loading /> : ''}
      <MainWrap>
        <CustomSectionWrap className={styles.section}>
          <Wrap>
            <Form.Root onSubmit={events.submit}>
              <Ul>
                <Li>
                  <Title>로그인 페이지</Title>
                </Li>
                <Li>
                  <Form.Field name='username'>
                    <FormDiv>
                      <Form.Label asChild>
                        <FormLabel>사용자 이름</FormLabel>
                      </Form.Label>
                      <Form.Message match={'valueMissing'}>
                        <small>사용자 이름을 입력 해 주세요.</small>
                      </Form.Message>
                    </FormDiv>
                    <Form.Control asChild>
                      <InputText
                        type='text'
                        defaultValue={loginRequest.username}
                        onChange={events.changeUsername}
                        required />
                    </Form.Control>
                  </Form.Field>
                </Li>
                <Li>
                  <Form.Field name='password'>
                    <FormDiv>
                      <Form.Label asChild>
                        <FormLabel>비밀번호</FormLabel>
                      </Form.Label>
                      <Form.Message match={'valueMissing'}>
                        <small>비밀번호를 입력 해 주세요.</small>
                      </Form.Message>
                    </FormDiv>
                    <Form.Control asChild>
                      <InputText
                        type='password'
                        defaultValue={loginRequest.password}
                        onChange={events.changePassword}
                        required />
                    </Form.Control>
                  </Form.Field>
                </Li>
                <Li>
                  <Form.Submit asChild>
                    <Button
                      type='submit'
                      className={styles.btnPrimary}
                    >
                      입력완료
                    </Button>
                  </Form.Submit>
                </Li>
                <Li>
                  <Button
                    type='button'
                    className={styles.btnSecondary}
                    onClick={events.back}
                  >
                    돌아가기
                  </Button>
                </Li>
              </Ul>
            </Form.Root>
          </Wrap>
        </CustomSectionWrap>
      </MainWrap>
    </>
  );
};

export const CustomSectionWrap = styled('section', {
  width: '100%',
  minHeight: '100vh',
  '&.first': {
    paddingTop: '5rem',
    minHeight: 'calc(100vh - 5rem)',
  }
});

const Wrap = styled('article', {
  width: '400px',
  padding: '3rem 0',
  boxShadow: '0 5px 16px #333333'
});

const Ul = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '1rem',
  padding: 0,
  listStyleType: 'none'
});

const Li = styled('li', {
  width: '80%',
});

const Title = styled('h1', {
  marginBottom: '1rem',
  textAlign: 'center',
  fontSize: '2rem',
});

const FormDiv = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const FormLabel = styled('label', {
  fontWeight: 800,
  '&[data-invalid]': {
    color: 'red'
  },
  '&[data-valid]': {
    color: 'green'
  }
});

const Button = styled('button', {
  width: '100%',
  padding: '0.4rem 0',
  border: 'none',
  borderRadius: '1rem',
  boxShadow: '0px 3px 6px black',
  fontSize: '1.03rem',
  fontWeight: 'bold',
});

export default LoginHome;