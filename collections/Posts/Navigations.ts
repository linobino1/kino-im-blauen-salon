import { CollectionConfig } from 'payload/types';
import { Type as PageType } from './Pages';
import { MediaType } from './Media';
import { t } from '../i18n';

export enum NavigationItemTypesEnum {
  internal = 'internal',
  external = 'external',
  subnavigation = 'subnavigation',
}

export type NavigationItem = {
  id: string
  type: NavigationItemTypesEnum
  name: string
  page?: PageType
  url?: string
  icon?: MediaType
  subnavigation?: Type
};

export enum NavigationTypesEnum {
  main = 'main',
  footer = 'footer',
  socialMedia = 'socialMedia',
}

export type Type = {
  type: NavigationTypesEnum
  items: NavigationItem[]
};

export const Navigations: CollectionConfig = {
  slug: 'navigations',
  admin: {
    group: t('Site'),
    useAsTitle: 'type',
    defaultColumns: ['type'],
  },
  access: {
    read: (): boolean => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Main Navigation',
          value: NavigationTypesEnum.main,
        },
        {
          label: 'Footer Navigation',
          value: NavigationTypesEnum.footer,
        },
        {
          label: 'Social Media',
          value: NavigationTypesEnum.socialMedia,
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      admin: {
        components: {
          RowLabel: ({ data }): string => data.name,
        },
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            {
              label: 'Internal Link',
              value: 'internal',
            },
            {
              label: 'External Link',
              value: 'external',
            },
            {
              label: 'Subnavigation',
              value: 'subnavigation',
            },
          ],
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        // internal link
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (data, siblingData): boolean => (
              siblingData.type === NavigationItemTypesEnum.internal
            ),
          },
        },
        // external link
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        // subnavigation
        {
          name: 'subnavigation',
          type: 'relationship',
          relationTo: 'navigations',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'subnavigation',
          },
        },
      ],
    },
  ],
};

export default Navigations;
