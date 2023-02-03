import React from 'react';
import classes from '../../css/posts.module.css';
import { Post as PostType } from '../../payload-types';
import { Post } from './Post';
import { _t } from '../../i18n';

type Props = {
  posts: PostType[]
};

export const Posts: React.FC<Props> = (props) => {
  const { posts } = props;

  return posts ? (
    <div className={classes.posts}>
      {posts.map((post) => (
        <Post post={post} key={post.slug} />
      ))}
    </div>
  ) : (
    <div className={classes.noPosts}>{_t('No posts.')}</div>
  );
};
