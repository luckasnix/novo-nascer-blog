import { GetStaticPaths, GetStaticProps } from 'next'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../../containers/layout'
import Date from '../../components/date'
import AuthorBox from '../../components/author-box'
import { PostItemProps } from '../../components/post-item'
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

interface PostProps {
  post: PostItemProps
}

export default function Post({ post: { title, date, coverImage, content, author } }: PostProps) {
  return (
    <Layout>
      <div className={styles.post}>
        <div className={styles.wrapper}>
          <Date date={date}/>
          <h1>{title}</h1>
          <AuthorBox {...author}/>
          <img src={urlFor(coverImage).width(720).url()} alt={coverImage.description} loading='lazy'/>
          <BlockContent className={styles.content} blocks={content} serializers={serializers}/>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsSlugs = await getPostsSlugs()
  const paths = postsSlugs.map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { slug } = ctx.params
  if (slug instanceof Array) {
    slug = slug[0]
  }
  const post = await getPost(slug)
  return {
    props: {
      post
    }
  }
}
