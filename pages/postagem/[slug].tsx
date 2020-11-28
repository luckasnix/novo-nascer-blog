import Head from 'next/head'
import { useRouter } from 'next/router'
import { jsonLdScriptProps } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import PreviewMode from '../../components/preview-mode'
import Date from '../../components/date'
import AuthorBox from '../../components/author-box'
import BlockContent from '@sanity/block-content-to-react'
import { GetServerSideProps } from 'next'
import { PostItemProps } from '../../components/post-item'
import { urlFor, getPost } from '../../utils/sanity'
import styles from '../../styles/post.module.scss'

const serializers = {
  types: {
    image: ({
      node: {
        asset,
        description,
        caption
      }
    }) => (
      <figure>
        <img src={urlFor(asset).width(480).url()} alt={description}/>
        <figcaption>{caption}</figcaption>
      </figure>
    )
  }
}

export interface PostProps {
  post: PostItemProps
  preview: boolean
}

export default function Post({
  post,
  preview
}: PostProps) {
  const coverImageUrl = urlFor(post.coverImage).width(720).url()
  const authorProfilePictureUrl = urlFor(post.author.profilePicture).width(128).url()
  const router = useRouter()
  return (
    <>
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
          {preview && (
            <PreviewMode onClick={() => {
              router.push('/api/exit-preview')
            }}/>
          )}
          <Date date={post.date}/>
          <h1>{post.title}</h1>
          <AuthorBox {...post.author}/>
          <img src={coverImageUrl} alt={post.coverImage.description} loading='lazy'/>
          <BlockContent className={styles.content} blocks={post.content} serializers={serializers}/>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params: {
    slug
  },
  preview = false
}) => {
  if (slug instanceof Array) {
    slug = slug[0]
  }
  const post = await getPost(slug, preview)
  return {
    props: {
      post,
      preview
    }
  }
}
