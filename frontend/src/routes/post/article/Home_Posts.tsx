import { useState, useEffect, Fragment } from 'react';
import api from '../../../app/api';
import Loading from '../../etc/Loading';
import styles from './Home_Posts.module.css';
import { PostResDto, UserPrincipal } from '../../../app/types';
import { useParams } from 'react-router-dom';

const OPEN_MODAL = 'post_open_modal';
const SUBMIT_ADD = 'post_add_submit';
const GO_DETAIL = 'post_get_detail';
const GO_PAGE = 'post_page';

const Posts = ({ userPrincipal }: { userPrincipal: UserPrincipal }) => {
  const [data, setData] = useState<PostResDto>(null);
  const [getPosts] = api.useLazyGetPostsQuery();

  const goPage = async (page: number) => {
    const response = await getPosts({ page: page });
    if (!response.isLoading && response.status === "fulfilled") {
      const data = response.data;
      setData(data);
    }
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const label = target.ariaLabel as string;
    switch (label) {
      case GO_DETAIL: {
        break;
      }
      case GO_PAGE: {
        const page = target.dataset.page;
        goPage(Number(page));
        break;
      }
    }
  };

  const setup = async () => {
    const response = await getPosts({});
    if (!response.isLoading && response.status === "fulfilled") {
      const data = response.data;
      setData(data);
    }
  };

  useEffect(() => {
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
            <tr className={styles.tr} aria-label={GO_DETAIL}>
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
      temp = (
        <tr key={0}>
          <td className={styles.nothing}>등록 된 게시글이 존재하지 않습니다.</td>
        </tr>
      );
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

  console.log(data);
  return (
    <article className={styles.article}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 className={styles.title}>게시판 구현</h1>
        {
          userPrincipal
            ? (
              <button
                type='button'
                style={{ marginLeft: '1rem' }}
                aria-label={OPEN_MODAL}
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
  );
};

export default Posts;