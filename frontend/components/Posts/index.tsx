import React from 'react';
import classes from '@/css/posts.module.css';
import { Post as PostType } from '@/payload-types';
import { Post } from './Post';
import { useTranslation } from 'next-i18next';

type Props = {
  posts?: PostType[]
};

export const Posts: React.FC<Props> = (props) => {
  const { posts } = props;
  const { t } = useTranslation(); 

  return posts?.length ? (
    <div className={classes.posts}>
      {posts.map((post) => (
        <div key={post.slug} >
          <Post post={post} />
          <hr />
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.noPosts}>{t('No posts.')}</div>
  );
};
