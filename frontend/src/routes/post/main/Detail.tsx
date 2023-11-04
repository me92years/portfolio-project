import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentGetDto, PostGetDto, UserPrincipal } from '../../../app/types';
import api from '../../../app/api';
import Post from '../article/Detail_Post';
import Comments from '../article/Detail_Comments';
import styles from './Detail.module.css';

const Detail = ({ userPrincipal }: { userPrincipal: UserPrincipal }) => {
  const [post, setPost] = useState<PostGetDto>();
  const [comments, setComments] = useState<CommentGetDto[]>();
  const [getPost] = api.useLazyGetPostsQuery();
  const { pid } = useParams();

  let view: JSX.Element[] = [];

  if (post) {
    view.push((
      <section className={styles.section} key={0}>
        <Post
          post={post}
          userPrincipal={userPrincipal}
        />
      </section>)
    );
  }

  if (post && comments) {
    view.push((
      <section className={styles.section} key={1}>
        <Comments
          comments={comments}
          userPrincipal={userPrincipal}
          postPid={Number(post.pid)}
        />
      </section>
    ));
  }

  if (!(post || comments)) {
    view = [(
      <section className={styles.section} key={1}>
        <article className={styles.article}>
          게시물 정보를 불러오지 못했습니다.
        </article>
      </section>
    )]
  }

  const setup = async () => {
    const response = await getPost({ pid: Number(pid) });
    if (!response.isLoading) {
      if (response.status === "fulfilled") {
        const dto = response.data.dtoList[0] as PostGetDto;
        setPost(dto);
        setComments(dto.comments);
      }
    }
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <main className={styles.main}>
      {view}
    </main>
  );
}


export default Detail;