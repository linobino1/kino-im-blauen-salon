import React from 'react';
import classes from '../../css/posts.module.css';
import { Type as PostType } from '../../collections/Posts';
import { Component as PostComponent } from './Post';
import { _t } from '../../i18n';

export type Type = {
  posts: PostType[]
};

export const Posts: React.FC<Type> = (props) => {
  const { posts } = props;

  return posts ? (
    <div className={classes.posts}>
      {posts.map((post) => (
        <PostComponent post={post} />
      ))}
    </div>
  ) : (
    <div className={classes.noPosts}>{_t('No posts.')}</div>
  );
};
