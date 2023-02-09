import { Post as PostComponent } from '@/components/Post';
import { Post } from '@/payload-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from './postsList.module.css';

export type Props = {
  blockType: 'postsList'
  blockName?: string
  from?: string
  posts: Post[]
}

export const PostsList: React.FC<Props> = ({ posts }) => {
  const { t } = useTranslation(); 

  return posts?.length ? (
    <div className={classes.posts}>
      {posts.map((post) => (
        <div key={post.slug} >
          <PostComponent post={post} />
          <hr />
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.noPosts}>{t('No posts.')}</div>
  );
};

export default PostsList;