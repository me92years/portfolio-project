import { useState, useEffect, Fragment, FormEvent, Dispatch } from 'react';
import { CommentGetDto, UserPrincipal } from '../../../app/types';
import api from '../../../app/api';
import styles from './Detail_Comments.module.css';

const MOD = 'mod';
const MOD_SUBMIT = 'mod_submit';
const MOD_CANCLE = 'mod_cancle';
const DEL = 'del';
const PUT_IN_COMMENT = 'put_in_comment';
const PUT_SUBMIT = 'put_submit';
const PUT_CANCLE = 'put_cancle';
const PUT_IN_POST = 'put_in_post';
const PUT_IN_POST_SUBMIT = 'put_in_post_submit';
const PUT_IN_POST_CANCLE = 'put_in_post_cancle';

type PutMutation = ReturnType<typeof api.usePutCommentMutation>;
type ModMutation = ReturnType<typeof api.useModCommentMutation>;
type DelMutation = ReturnType<typeof api.useDelCommentMutation>;

const Comment = ({
  comments,
  targetPid,
  postPid,
  autoResize,
  setIsModal,
  putMutation,
  modMutation,
  delMutation,
  userPrincipal
}: {
  comments: CommentGetDto[],
  targetPid: number,
  postPid: number,
  autoResize: (e: FormEvent<HTMLTextAreaElement>, maxLength: number) => void,
  setIsModal: Dispatch<React.SetStateAction<boolean>>,
  userPrincipal: UserPrincipal
  putMutation: PutMutation,
  modMutation: ModMutation,
  delMutation: DelMutation,
}) => {
  const [view, setView] = useState<{ [key: string]: JSX.Element }>({});
  const [putComment] = putMutation;
  const [modComment] = modMutation;
  const [delComment] = delMutation;
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const label = target.ariaLabel;
    const form = target.closest('form') as HTMLFormElement;

    // 버튼 토글
    const toggleBtn = (form: HTMLFormElement) => {
      const featuresBasic = document.querySelectorAll(`.feature_basic`);
      const featuresMod = form.querySelectorAll(`.feature_mod`);
      for (let i = 0; i < featuresBasic.length; i++) {
        const featureBasic = featuresBasic[i] as HTMLButtonElement;
        const featureMod = featuresMod[i] as HTMLButtonElement;
        featureBasic.classList.toggle(`${styles.hidden}`);
        if (label === MOD || label === MOD_CANCLE) {
          featureMod?.classList.toggle(`${styles.hidden}`)
        }
      }
    }

    // 답글 추가 submit
    if (label === PUT_SUBMIT) {
      e.preventDefault();
      const submit = async (put: string) => {
        const result = await putComment(put).unwrap();
        if (result) {
          location.reload();
        } else {
          alert("서버 문제로 추가하지 못했습니다. 다시 시도 해 주세요.");
        }
      }
      const entries = Object.fromEntries(new FormData(form));
      submit(JSON.stringify(entries));
      return;
    }

    // 답글 취소 기능
    if (label === PUT_CANCLE) {
      e.preventDefault();
      const putIndex = target.dataset.put_index as string;
      toggleBtn(form);
      setView(prev => {
        delete prev[putIndex];
        return { ...prev };
      })
      return;
    };

    // 게시글에 댓글 추가 모달 오픈
    if (label === PUT_IN_POST) {
      e.preventDefault();
      console.log("test")
      setIsModal(true);
      return;
    }

    // 댓글에 답글 추가
    if (label === PUT_IN_COMMENT) {
      e.preventDefault();
      const parentPid = Number(target.dataset.parent_pid);
      const index = Number(target.dataset.index);
      const PUT_INDEX = `${index}-9999`;
      toggleBtn(form);

      // 답글 버튼 생성
      let temp: { [key: string]: JSX.Element } = {
        [PUT_INDEX]: (
          <form key={PUT_INDEX} >
            <input type='hidden' name='postPid' value={postPid} />
            <input type='hidden' name='parentPid' value={parentPid} />
            <div className={`${styles.comment}`}>
              <textarea
                name="innerText"
                className={`${styles.textarea} ${styles.textarea_span}`}
                onInput={e => autoResize(e, 40)}
                required
              />
              <div>
                <button
                  type='button'
                  aria-label={PUT_SUBMIT}
                >
                  완료
                </button>
                <button
                  type='button'
                  data-put_index={PUT_INDEX}
                  aria-label={PUT_CANCLE}
                >
                  취소
                </button>
              </div>
            </div>
          </form>
        )
      };
      setView(prev => ({ ...prev, ...temp }));
      return;
    }

    // 댓글 수정
    if (label === MOD) {
      e.preventDefault();
      const textarea = form.querySelector('textarea') as HTMLTextAreaElement;
      textarea.disabled = false;
      toggleBtn(form);
      return;
    };

    // 댓글 수정 취소
    if (label === MOD_CANCLE) {
      e.preventDefault();
      const textarea = form.querySelector('textarea') as HTMLTextAreaElement;
      textarea.disabled = true;
      textarea.value = textarea.defaultValue;
      toggleBtn(form);
      return;
    }

    // 댓글 수정 서브밋
    if (label === MOD_SUBMIT) {
      e.preventDefault();
      const submit = async (json: string) => {
        const result = await modComment(json).unwrap();
        if (result) {
          location.reload();
        } else {
          alert("서버 문제로 수정하지 못했습니다. 다시 시도 해 주세요.");
        }
      }
      const entries = Object.fromEntries(new FormData(form));
      submit(JSON.stringify(entries));
      return;
    }

    if (label === DEL) {
      e.preventDefault();
      if (confirm("댓글을 삭제하시겠습니까?")) {
        const deleteSubmit = async (json: string) => {
          const result = await delComment(json).unwrap();
          if (result) {
            location.reload();
          } else {
            alert("서버에 문제가 발생했습니다. 다시 시도 해 주세요.");
          }
        }
        const entries = Object.fromEntries(new FormData(form));
        const json = JSON.stringify(entries);
        deleteSubmit(json);
      }
      return;
    }

  }

  // 렌더링 될 댓글 생성
  const createComment = ({ comment, index, childIndex, isParentDiv }: {
    comment: CommentGetDto,
    index: number,
    childIndex?: number
    isParentDiv: boolean,
  }) => {
    let tempChildIndex = !childIndex ? 0 : childIndex;

    return (
      <Fragment key={`${index}-${tempChildIndex}`}>
        <form>
          <input type='hidden' name='pid' value={comment.pid} />
          <div className={`${styles.comment} ${isParentDiv ? styles.parentDiv : styles.childDiv}`}>
            {isParentDiv ? '' : <div style={{ fontSize: '2rem' }}>└</div>}
            <div>{comment.writerName}</div>
            <textarea
              className={styles.textarea}
              name='innerText'
              defaultValue={comment.innerText}
              disabled
              required
            />
            <div><small>{comment.regDate}</small></div>
            <div><small>{comment.modDate}</small></div>
            <div>
              {
                isParentDiv
                  ? userPrincipal
                    ? (
                      (
                        <>
                          <button
                            type='button'
                            className={`feature_basic`}
                            aria-label={PUT_IN_COMMENT}
                            data-index={index}
                            data-parent_pid={`${comment.pid}`}
                          >
                            답글
                          </button>
                          <button
                            type='button'
                            className={`feature_mod ${styles.hidden}`}
                            data-parent_pid={`${comment.pid}`}
                            aria-label={MOD_SUBMIT}
                          >
                            완료
                          </button>
                        </>
                      )
                    )
                    : ''
                  : userPrincipal
                    ? (
                      <button
                        type='button'
                        className={`feature_mod ${styles.hidden}`}
                        data-parent_pid={`${comment.pid}`}
                        aria-label={MOD_SUBMIT}
                      >
                        완료
                      </button>
                    ) : ''
              }
              {
                userPrincipal && userPrincipal.email === comment.writerEmail
                  ? (
                    <>
                      <button
                        type='button'
                        className={`feature_basic`}
                        aria-label={MOD}
                      >
                        수정
                      </button>
                      <button
                        type='button'
                        className={`feature_del`}
                        aria-label={DEL}
                      >
                        삭제
                      </button>
                      <button
                        type='button'
                        className={`feature_mod ${styles.hidden}`}
                        aria-label={MOD_CANCLE}
                      >
                        취소
                      </button>
                    </>
                  )
                  : ''
              }
            </div>
          </div>
        </form>
      </Fragment>
    )
  }

  // 초기 세팅
  const setup = () => {
    let temp: { [key: string]: JSX.Element } = {};
    if (!comments.length) {
      temp = {
        0: (
          <div key={0} style={{ textAlign: 'center' }}>
            댓글이 존재하지 않습니다. 댓글을 추가 해 주세요.
          </div>
        )
      }
    } else {
      comments.forEach((comment, index) => {
        if (comment.parentPid == targetPid) {
          temp = {
            ...temp,
            [`${index}`]: (
              createComment({
                comment,
                index,
                isParentDiv: comment.parentPid === 0
              })
            )
          }
          comments
            .filter(c => c.parentPid === comment.pid)
            .forEach((child, childIndex) => {
              temp = {
                ...temp,
                [`${index}-${childIndex}`]: (
                  createComment({
                    comment: child,
                    index,
                    childIndex: childIndex + 1,
                    isParentDiv: child.parentPid == 0
                  })
                )
              }
            })
        }
      });
    }
    setView(temp)
  };

  useEffect(() => {
    setup();
    addEventListener('click', handleClick);
    return () => {
      removeEventListener('click', handleClick);
    }
  }, [userPrincipal]);

  // 정렬 후 렌더링
  const render = () => {
    let newArr: JSX.Element[] = [];
    let arr = Object.entries(view);
    arr = arr.sort((a, b) => a[0].localeCompare(b[0]));
    arr.forEach(((arr) => {
      newArr.push(arr[1]);
    }));
    return newArr;
  }

  return render();
};


// 루트 코멘트 컴포넌트
const Comments = ({ comments, postPid, userPrincipal }: {
  comments: CommentGetDto[],
  postPid: number,
  userPrincipal: UserPrincipal
}) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const putMutation = api.usePutCommentMutation();
  const modMutation = api.useModCommentMutation();
  const delMutation = api.useDelCommentMutation();
  const [putComment] = putMutation;

  // 리사이즈
  const autoResize = (e: FormEvent<HTMLTextAreaElement>, maxLength: number) => {
    e.preventDefault();
    const textarea = e.target as HTMLTextAreaElement;
    const lineHeight = 1;
    const maxLines = 5;
    let lines = textarea.value.split('\n');
    const lineCount = lines.length;
    for (let i = 0; i < lineCount; i++) {
      if (lines[i].length >= maxLength) {
        lines[i] = lines[i].substring(0, maxLength);
      }
    }
    if (lineCount <= maxLines) {
      textarea.style.height = `${lineCount * lineHeight}rem`;
    } else {
      lines = lines.slice(0, maxLines);
      textarea.style.height = `${maxLines * lineHeight}rem`;
    }
    textarea.value = lines.join('\n');
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const label = target.ariaLabel as string;
    const put = async (json: string) => {
      const response = await putComment(json).unwrap();
      if (response) {
        location.reload();
      } else {
        alert("서버에 문제가 발생했습니다. 다시 시도 해 주세요.");
      }
    };
    if (label === PUT_IN_POST_SUBMIT) {
      e.preventDefault();
      const form = target.closest('form') as HTMLFormElement;
      const entries = Object.fromEntries(new FormData(form))
      const json = JSON.stringify(entries);
      put(json);
      return;
    }
    if (label === PUT_IN_POST_CANCLE) {
      setIsModal(false);
      return;
    }
  };

  useEffect(() => {
    addEventListener('click', handleClick);
    return () => {
      removeEventListener('click', handleClick);
    }
  }, [userPrincipal]);


  return (
    <article className={styles.article}>
      <div className={`${styles.modal} ${!isModal ? styles.hidden : ''}`}>
        <form>
          <input type='hidden' name='postPid' value={postPid} />
          <div className={styles.modal_form}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h1>댓글을 작성 후 완료 버튼을 눌러주세요.&nbsp;</h1>
              <button
                type='button'
                aria-label={PUT_IN_POST_SUBMIT}
              >
                완료
              </button>
              <button
                type='button'
                aria-label={PUT_IN_POST_CANCLE}
              >
                취소
              </button>
            </div>
            <textarea
              className={styles.modal_textarea}
              name='innerText'
              onInput={(e) => autoResize(e, 40)}
            />
          </div>
        </form>
      </div>
      <div className={styles.top}>
        <div className={styles.topWrap}>
          <h1 className={styles.title}>Comments</h1>
          {
            userPrincipal
              ? (
                <button
                  className={styles.button}
                  aria-label={PUT_IN_POST}
                >
                  댓글 추가
                </button>
              )
              : ''
          }
        </div>
      </div>
      <Comment
        comments={comments}
        targetPid={0}
        postPid={postPid}
        putMutation={putMutation}
        modMutation={modMutation}
        delMutation={delMutation}
        autoResize={autoResize}
        setIsModal={setIsModal}
        userPrincipal={userPrincipal}
      />
    </article>
  )
}

export default Comments;