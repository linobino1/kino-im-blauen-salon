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

  try {
    await res.revalidate(`/${slug}`);
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
  return res.json({ revalidated: true })
}