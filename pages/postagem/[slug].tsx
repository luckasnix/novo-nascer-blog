import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../../containers/layout'
import Date from '../../components/date'
import AuthorBox from '../../components/author-box'
import { GetStaticPaths, GetStaticProps } from 'next'
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

export default function Post({ post }: PostProps) {
  const coverImageUrl = urlFor(post.coverImage).width(720).url()
  const authorProfilePictureUrl = urlFor(post.author.profilePicture).width(128).url()
  return (
    <Layout>
      <Head>
        <script
          {...jsonLdScriptProps<BlogPosting>({
            '@context': 'https://schema.org', 
            '@type': 'BlogPosting',
            'headline': post.title,
            'description': post.description,
            'datePublished': post.date,
            'image': coverImageUrl,
            'author': {
              '@type': 'Person',
              'name': post.author.name,
              'image': authorProfilePictureUrl
            }
          })}
        />
      </Head>
      <div className={styles.post}>
        <div className={styles.wrapper}>
          <Date date={post.date}/>
          <h1>{post.title}</h1>
          <AuthorBox {...post.author}/>
          <img src={coverImageUrl} alt={post.coverImage.description} loading='lazy'/>
          <BlockContent className={styles.content} blocks={post.content} serializers={serializers}/>
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
