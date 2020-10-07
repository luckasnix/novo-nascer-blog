import BlockContent from '@sanity/block-content-to-react'
import Layout from '../../containers/layout'
import Date from '../../components/date'
import Author from '../../components/author'
import { urlFor, getPostsSlugs, getPost } from '../../utils/sanity'
import styles from '../../styles/post.module.scss'

const serializers = {
  types: {
    image: ({ node: { asset, description, caption }}) => (
      <figure>
        <img src={urlFor(asset).width(480).url()} alt={description}/>
        <figcaption>{caption}</figcaption>
      </figure>
    )
  }
}

export default function Post({ post: { title, date, coverImage, content, author } }) {
  return (
    <Layout>
      <div className={styles.post}>
        <div className={styles.wrapper}>
          <h1>{title}</h1>
          <Date date={date} size='md'/>
          <img src={urlFor(coverImage).width(720).url()} alt={coverImage.description} loading='lazy'/>
          <BlockContent className={styles.content} blocks={content} serializers={serializers}/>
          <Author {...author}/>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const postsSlugs = await getPostsSlugs()
  const paths = postsSlugs.map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params
  const post = await getPost(slug)
  return {
    props: {
      post
    }
  }
}
