import { Page as PageType } from '@/payload-types';

export type Block = PageType['layout'][0];

export type PostsListBlock = Extract<Block, { blockType: 'postsList' }>;

export function isPostsList(item: Block): item is PostsListBlock {
  return item.blockType === 'postsList';
}

export type ScreeningsListBlock = Extract<Block, { blockType: 'screeningsList' }>;

export function isScreeningsList(item: Block): item is ScreeningsListBlock {
  return item.blockType === 'screeningsList';
}