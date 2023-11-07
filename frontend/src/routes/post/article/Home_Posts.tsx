import { useState, useEffect, Fragment } from 'react';
import { PostResDto, UserPrincipal } from '../../../app/types';
import api from '../../../app/api';
import styles from './Home_Posts.module.css';

const CHANGE_MODAL = 'change_modal';
const SUBMIT = 'submit';
const GO_DETAIL = 'go_detail';
const GO_PAGE = 'go_page';

const Posts = ({ userPrincipal }: { userPrincipal: UserPrincipal }) => {
  const [data, setData] = useState<PostResDto>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [getPosts] = api.useLazyGetPostsQuery();
  const [putPost] = api.usePutPostMutation();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const label = target.ariaLabel as string;
    switch (label) {
      case GO_DETAIL: {
        const pid = target.dataset.pid;
        location.href = `/post/get/${pid}`;
        break;
      }
      case GO_PAGE: {
        const goPage = async (page: number) => {
          const response = await getPosts({ page: page });
          if (!response.isLoading && response.status === "fulfilled") {
            const data = response.data;
            setData(data);
          }
        };
        const page = target.dataset.page;
        goPage(Number(page));
        break;
      }
      case CHANGE_MODAL: {
        setOpen(prev => !prev);
        break;
      }
      case SUBMIT: {
        const submit = async (json: string) => {
          const result = await putPost(json).unwrap();
          if (result) {
            location.reload();
          } else {
            alert("서버에 이상이 생겨 작업을 완료하지 못했습니다. 다시 시도 해 주세요.")
          }
        };
        const form = target.closest('form') as HTMLFormElement;
        const formEntries = Object.fromEntries(new FormData(form));
        const completed = Object.values(formEntries).every((value) => value);
        if (completed) {
          submit(JSON.stringify(formEntries));
        }
        break;
      }
    }
  };

  useEffect(() => {
    const setup = async () => {
      const response = await getPosts({});
      if (!response.isLoading && response.status === "fulfilled") {
        const data = response.data;
        setData(data);
      }
    };
    setup();
    addEventListener('click', handleClick);
    return () => {
      removeEventListener('click', handleClick);
    };
  }, []);

  const internalServerError = () => (
    <tr>
      <td className={styles.nothing}>등록 된 게시글이 존재하지 않습니다.</td>
    </tr>
  );

  const renderDtos = () => {
    let elements: JSX.Element[] = [];
    const dtoList = data?.dtoList;
    let temp: JSX.Element;
    if (dtoList && dtoList.length) {
      dtoList.map((dto, index) => {
        temp = (
          <Fragment key={index}>
            <tr className={styles.tr} data-pid={dto.pid} aria-label={GO_DETAIL}>
              <td className={styles.td}>{dto.pid}</td>
              <td className={styles.td}>{dto.writerName}</td>
              <td className={styles.td}>{dto.title}</td>
              <td className={styles.td}>{dto.regDate}</td>
              <td className={styles.td}>{dto.modDate}</td>
            </tr>
          </Fragment>
        );
        elements.push(temp);
      });
    } else {
      temp = (internalServerError());
      elements.push(temp);
    }

    return elements;
  };

  const renderPaging = () => {
    return data?.pageList.map((page, index) => {
      const realIndex = index + 1;
      const isCurrentPage = data.page === page;
      return (
        <Fragment key={index}>
          {((realIndex) * (data.start) === data.start) && (data.prev)
            ? (
              <li
                className={`${styles.pagingLi}`}
                data-page={page - 1}
                aria-label={GO_PAGE}
              >
                prev
              </li>
            )
            : <></>}
          <li
            className={`${styles.pagingLi}  ${isCurrentPage ? styles.currentPage : ''}`}
            data-page={page}
            aria-label={GO_PAGE}
          >
            {page}
          </li>
          {((realIndex) * (data.end / data.size) === data.end) && (data.next)
            ? (
              <li
                className={styles.pagingLi}
                data-page={page + 1}
                aria-label={GO_PAGE}
              >
                next
              </li>
            )
            : <></>}
        </Fragment>
      );
    });
  };

  return (
    <>
      <article className={styles.article}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>게시판 구현</h1>
          {
            userPrincipal
              ? (
                <button
                  type='button'
                  className={styles.add_button}
                  aria-label={CHANGE_MODAL}
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
              <th className={styles.th}>번호</th>
              <th className={styles.th}>작성자</th>
              <th className={styles.th}>제목</th>
              <th className={styles.th}>작성일자</th>
              <th className={styles.th}>수정일자</th>
            </tr>
          </thead>
          <tbody>
            {
              !data
                ? internalServerError()
                : renderDtos()
            }
          </tbody>
        </table>
        <ul className={styles.pagingUl}>
          {
            !data
              ? <></>
              : renderPaging()
          }
        </ul>
      </article>
      {
        open
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
                      aria-label={CHANGE_MODAL}
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
                      required
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
                      aria-label={SUBMIT}
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
};

export default Posts;