import { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'
import { getPostsMetadata } from '../../utils/sanity'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const smStream = new SitemapStream({
    hostname: `https://${req.headers.host}`
  })

  smStream.write({
    url: '/',
    priority: 1.0
  })

  const postsMetadata = await getPostsMetadata()
  postsMetadata.forEach(({ slug, _updatedAt }: { slug: string, _updatedAt: string }) => {
    smStream.write({
      url: `postagem/${slug}`,
      lastmod: _updatedAt,
      changefreq: 'weekly',
      priority: 0.8
    })
  })

  smStream.end()

  const sitemap = await streamToPromise(smStream)
    .then(sm => sm.toString())
  
  res.setHeader('Content-Type', 'application/xml')

  res.write(sitemap)

  res.end()
}
