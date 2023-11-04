import { useEffect, useState } from 'react';
import { PostGetDto, UserPrincipal } from '../../../app/types';
import styles from './Detail_Post.module.css';
import api from '../../../app/api';

const POST_MOD = 'post_mod';
const POST_MOD_SUBMIT = 'post_mod_submit';
const POST_MOD_CANCLE = 'post_mod_cancle';
const POST_DEL = 'post_del';

const Post = ({ post, userPrincipal }: { post: PostGetDto, userPrincipal: UserPrincipal }) => {
  const [isModEnabled, setIsModEnabled] = useState<boolean>(false);
  const [modPost] = api.useModPostMutation();
  const [delPost] = api.useDelPostMutation();

  const handleClick = (e: globalThis.MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const label = target.ariaLabel as string;

    const postModSubmit = async () => {
      const form = target.closest('form') as HTMLFormElement;
      const entries = Object.fromEntries(new FormData(form));
      let isEmpty = false;
      for (const key in entries) {
        const value = entries[key];
        if (!value) {
          alert("입력되지 않은 값이 존재합니다.");
          isEmpty = true;
          return;
        }
      }
      if (isEmpty) return;
      const result = await modPost(JSON.stringify(entries)).unwrap();
      if (result) {
        alert("수정을 완료했습니다.");
        location.reload();
      } else {
        alert("서버에 문제가 발생하여 수정에 실패했습니다. 다시 시도 해 주세요.");
      }
    };

    const postDelSubmit = async () => {
      const form = target.closest('form') as HTMLFormElement;
      const entries = Object.fromEntries(new FormData(form));
      const result = await delPost(JSON.stringify(entries)).unwrap();
      if (result) {
        alert("삭제를 완료했습니다.");
        location.href = '/';
      } else {
        alert("서버에 문제가 발생하여 삭제에 실패했습니다. 다시 시도 해 주세요.");
      }
    }

    if (label === POST_MOD) {
      setIsModEnabled(prev => !prev);
      return;
    }

    if (label === POST_MOD_SUBMIT) {
      postModSubmit();
      return;
    }

    if (label === POST_DEL) {
      if (confirm("글을 삭제하시겠습니까?")) {
        postDelSubmit();
      }
      return;
    }

    if (label === POST_MOD_CANCLE) {
      setIsModEnabled(false);
      return;
    }

  }

  let buttons: JSX.Element = userPrincipal
    ? isModEnabled
      ? (
        <div className={`${styles.div} ${styles.div_f}`}>
          <button
            type='button'
            className={`${styles.button}`}
            aria-label={POST_MOD_CANCLE}
          >
            수정취소
          </button>
          <button
            type='button'
            className={`${styles.button}`}
            aria-label={POST_MOD_SUBMIT}
          >
            수정완료
          </button>
        </div >
      )
      : (
        <div className={`${styles.div} ${styles.div_f}`}>
          <button
            type='button'
            className={`${styles.button}`}
            aria-label={POST_MOD}
          >
            수정하기
          </button>
          <button
            type='button'
            className={`${styles.button}`}
            aria-label={POST_DEL}
          >
            삭제하기
          </button>
        </div >
      )
    : <></>

  useEffect(() => {
    addEventListener('click', handleClick);
    return () => {
      removeEventListener('click', handleClick);
    }
  }, [userPrincipal]);

  return (
    <article className={styles.article}>
      <form>
        <h1 className={styles.title}>게시글</h1>
        <input type='hidden' name='pid' value={post.pid} />
        <div className={styles.post}>
          <div className={`${styles.div} ${styles.div_a}`}>
            <label>작성자</label>
            <input
              type='text'
              name='writerName'
              className={styles.input_text}
              defaultValue={post.writerName}
              disabled />
          </div>
          <div className={`${styles.div} ${styles.div_b}`}>
            <label>작성일자</label>
            <input
              type='text'
              name='regDate'
              className={styles.input_text}
              defaultValue={post.regDate}
              disabled />
          </div>
          <div className={`${styles.div} ${styles.div_c}`}>
            <label>제목</label>
            <input
              type='text'
              name='title'
              className={styles.input_text}
              defaultValue={post.title}
              disabled={!isModEnabled}
              required
            />
          </div>
          <div className={`${styles.div} ${styles.div_d}`}>
            <label>수정일자</label>
            <input
              type='text'
              name='modDate'
              className={styles.input_text}
              defaultValue={post.modDate}
              disabled />
          </div>
          <div className={`${styles.div} ${styles.div_e}`}>
            <label>내용</label>
            <textarea
              name='innerText'
              className={styles.input_textarea}
              defaultValue={post.innerText}
              disabled={!isModEnabled}
              required
            />
          </div>
          {buttons}
        </div>
      </form>
    </article>
  );
};

export default Post;
