import apollo from '@/graphql/apollo'
import { Page } from '@/payload-types'
import { gql } from '@apollo/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (!req.query.slug) {
    return res.status(400).json({ message: 'Missing post slug'})
  }
  const slug = req.query.slug;

  const postPagesQuery = await apollo.query({
    query: gql`
      query PagesWithPosts {
        Pages(where: { type: { equals: posts }}) {
          docs {
            slug
          }
        }
      }
    `,
  });
  const postPages: Page[] = postPagesQuery.data.Pages.docs;

  let errors = false;
  postPages.forEach(async (page) => {
    try {
      await res.revalidate(`/${page.slug}`);
      await res.revalidate(`/${page.slug}/${slug}`);
    } catch (err) {
      errors = true;
    }
  });

  if (errors) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  } else {
    return res.json({ revalidated: true })
  }
}