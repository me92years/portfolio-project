import { styled } from "@stitches/react";
import * as Form from '@radix-ui/react-form';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { dispatchPassword, dispatchUsername, resetState, selectLoginState } from "../../features/login/loginSlice";
import { useLoginMutation } from "../../features/login/loginApi";
import Loading from "./Loading";

function Login() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectLoginState);

  const [loginMutation, { isLoading }] = useLoginMutation();

  const events = {
    onClickBack: () => {
      dispatch(resetState());
      navigate('/mediadb');
      location.reload();
    },
    onSubmitHandle: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const response: { data: number } = await loginMutation(state) as { data: number };
      if (response.data) {
        navigate('/mediadb');
      } else {
        alert("로그인에 실패했습니다. 다시 로그인 해 주세요.");
        location.reload();
      }
    },
  }

  return (
    <Main>
      {isLoading ? <Loading size={'30%'} /> : ''}
      <Form.Root
        onSubmit={events.onSubmitHandle} asChild>
        <Root>
          <Title>
            사용자 이름 입력
          </Title>
          <Form.Field name='username' asChild>
            <Field>
              <LabelAndMessage>
                <Form.Label asChild>
                  <Label>사용자 이름</Label>
                </Form.Label>
                <Form.Message match='valueMissing' asChild>
                  <Message>사용자 이름을 입력 해 주세요.</Message>
                </Form.Message>
              </LabelAndMessage>
              <Form.Control asChild>
                <Text
                  type='text'
                  defaultValue={state.username}
                  onChange={(event) => dispatch(dispatchUsername(event.target.value))}
                  required
                />
              </Form.Control>
            </Field>
          </Form.Field>
          <Form.Field name='password' asChild>
            <Field>
              <LabelAndMessage>
                <Form.Label asChild>
                  <Label>비밀번호</Label>
                </Form.Label>
                <Form.Message match='valueMissing' asChild>
                  <Message>비밀번호를 입력 해 주세요.</Message>
                </Form.Message>
              </LabelAndMessage>
              <Form.Control asChild>
                <Text
                  type='password'
                  defaultValue={state.password}
                  onChange={(event) => dispatch(dispatchPassword(event.target.value))}
                  required
                />
              </Form.Control>
            </Field>
          </Form.Field>
          <Buttons>
            <Form.Submit asChild>
              <Button>입력완료</Button>
            </Form.Submit>
            <Button onClick={events.onClickBack}>이전으로</Button>
          </Buttons>
        </Root>
      </Form.Root>
    </Main>
  );
};

const Main = styled('main', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
});

const Root = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '350px',
  padding: '1rem',
  border: '1px solid black',
  borderRadius: '1rem'
});

const Title = styled('h1', {
  margin: '2rem 0'
});

const Field = styled('div', {
  display: 'block',
  width: '100%',
});

const LabelAndMessage = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const Label = styled('label', {
  fontWeight: 800,
  '&[data-valid]': {
    color: 'green',
  },
  '&[data-invalid]': {
    color: 'red',
  }
});

const Message = styled('small', {
  color: '#666',
  fontWeight: 500,
  lineHeight: '1.8'
});

const Text = styled('input', {
  width: 'calc(100% - 1.02rem)',
  padding: '0.4rem',
  fontSize: '1.1rem',
});

const Buttons = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.5rem',
  width: '100%',
  marginTop: '2rem',
});

const Button = styled('button', {
  cursor: 'pointer',
  width: '100%',
  padding: '0.4rem 0',
  borderRadius: '1rem',
  fontSize: '1.02rem',
  fontWeight: 500,
  '&:hover': {
    background: 'RoyalBlue',
    color: '#ffffff',
  }
});

export default Login;