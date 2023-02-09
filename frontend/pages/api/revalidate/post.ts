import { Page } from '@/payload-types'
import rest from '@/rest'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (!req.query.slug) {
    return res.status(400).json({ message: 'Missing slug'})
  }
  const slug = req.query.slug;

  const postPages = (await rest.get('pages?where[layout__blockType][contains]=postsList')).data.docs;

  let errors = false;
  postPages.forEach(async (page: Page) => {
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