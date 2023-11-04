import { useState, useEffect } from 'react';
import api from '../../../app/api';
import Loading from '../../etc/Loading';
import styles from './Home_Posts.module.css';
import { UserPrincipal } from '../../../app/types';

const POST_OPEN_MODAL = 'post_open_modal';
const POST_ADD_SUBMIT = 'post_add_submit';
const POST_GET_DETAIL = 'post_get_detail';

const Posts = ({ userPrincipal }: { userPrincipal: UserPrincipal }) => {
  const [view, setView] = useState<JSX.Element[]>([
    <tr className={styles.tr} key={0}>
      <td className={styles.td}><Loading width={'auto'} /></td>
      <td className={styles.td}><Loading width={'auto'} /></td>
      <td className={styles.td}><Loading width={'auto'} /></td>
      <td className={styles.td}><Loading width={'auto'} /></td>
    </tr>
  ]);
  const [getPosts] = api.useLazyGetPostsQuery();
  const [putPost] = api.usePutPostMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const setup = async () => {
      const response = await getPosts({});
      if (!response.isLoading) {
        let temp: JSX.Element[] = [];
        if (response.status === "fulfilled") {
          response.data.dtoList.forEach((dto, idx) => {
            temp.push((
              <tr className={styles.tr}
                key={idx}
                data-pid={dto.pid}
                aria-label={POST_GET_DETAIL}
              >
                <td>{dto.writerName}</td>
                <td>{dto.title}</td>
                <td>{dto.regDate}</td>
                <td>{dto.modDate}</td>
              </tr>
            ))
          });
        }

        if (temp.length) {
          setView(temp);
        } else {
          setView([(
            <tr key={0}>
              <td className={styles.nothing}>등록 된 게시글이 존재하지 않습니다.</td>
            </tr>
          )]);
        }
      }
    };
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLButtonElement;
      const label = target.ariaLabel as string;
      const form = target.closest('form') as HTMLFormElement;
      if (label === POST_OPEN_MODAL) {
        setIsOpen(prev => !prev);
        return;
      }
      if (label === POST_ADD_SUBMIT) {
        const submit = async (json: string) => {
          const result = await putPost(json).unwrap();
          if (result) {
            location.reload();
          } else {
            alert("서버에 문제가 발생했습니다. 다시 시도 해 주세요.");
          }
        }
        const entries = Object.fromEntries(new FormData(form));
        submit(JSON.stringify(entries));
        return;
      }
      if (label === POST_GET_DETAIL) {
        const pid = target.dataset.pid;
        location.href = `/post/get/${pid}`;
      }
    }
    setup();
    addEventListener('click', handleClick);
    return () => {
      removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <>
      <article className={styles.article}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 className={styles.title}>게시판 구현</h1>
          {
            userPrincipal
              ? (
                <button
                  type='button'
                  style={{ marginLeft: '1rem' }}
                  aria-label={POST_OPEN_MODAL}
                >
                  추가
                </button>
              )
              : ''
          }
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>작성자</th>
              <th className={styles.th}>제목</th>
              <th className={styles.th}>작성일자</th>
              <th className={styles.th}>수정일자</th>
            </tr>
          </thead>
          <tbody>
            {view}
          </tbody>
        </table>
      </article>
      {
        isOpen
          ? (
            <div className={styles.modal}>
              <form>
                <ul className={styles.modal_form}>
                  <li
                    style={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <h1 className={styles.modal_title}>글 작성</h1>
                    <button
                      type='button'
                      className={styles.modal_cancle}
                      aria-label={POST_OPEN_MODAL}
                    >
                      취소
                    </button>
                  </li>
                  <li>
                    <input
                      type='text'
                      className={styles.modal_text}
                      name='title'
                      placeholder='제목을 입력 해 주세요.'
                    />
                  </li>
                  <li>
                    <textarea name='innerText'
                      className={styles.modal_textarea}
                      placeholder='내용을 입력 해 주세요.'
                      required
                    />
                  </li>
                  <li>
                    <button
                      type='submit'
                      className={styles.modal_submit}
                      aria-label={POST_ADD_SUBMIT}
                    >
                      등록하기
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          )
          : ''
      }
    </>
  );
}

export default Posts;