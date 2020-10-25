import { NextApiRequest, NextApiResponse } from 'next'
import { getPost } from '../../utils/sanity'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { secret, slug } = req.query

  if (secret !== process.env.SANITY_PREVIEW_SECRET  || !slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (slug instanceof Array) {
    slug = slug[0]
  }

  const post = await getPost(slug, false)

  if(!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({})

  res.writeHead(307, {
    Location: `/postagem/${slug}`
  })

  res.end()
}
