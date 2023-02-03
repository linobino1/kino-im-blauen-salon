import React from 'react';
import classes from '../../css/posts.module.css';
import { Post as PostType } from '../../payload-types';
import RichText from '../RichText';
import { PostImage } from './PostImage';
import { Date } from '../Date';

type Props = {
  post: PostType
};

export const Component: React.FC<Props> = ({ post }) => (
  <div className={classes.post}>

    <Date className={classes.postDate} iso={post.date} />
    <h2 className={classes.postTitle}>{post.title}</h2>

    <div className={classes.postPreview}>
      <div className={classes.postImageWrapper}>
        {post.link ? (
          <a href={post.link}>
            <PostImage image={post.header} />
          </a>
        ) : (
          <PostImage image={post.header} />
        )}
      </div>
      <RichText content={post.content} className={classes.postContent} />
    </div>
  </div>
);
