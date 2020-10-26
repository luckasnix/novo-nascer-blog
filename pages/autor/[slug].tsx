import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Person } from 'schema-dts'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import CurrentPosts from '../../containers/current-posts'
import Pagination from '../../containers/pagination'
import { AuthorItemProps } from '../../components/author-item'
import { PostItemProps } from '../../components/post-item'
import { urlFor, getAuthorSlugs, getAuthorBySlug, getPostsByAuthorSlug } from '../../utils/sanity'

interface AuthorProps {
  author: AuthorItemProps
  posts: PostItemProps[]
}

export default function Author({ author, posts }: AuthorProps) {
  const router = useRouter()
  const { slug } = router.query
  const profilePictureUrl = urlFor(author.profilePicture).width(128).url()
  return (
    <>
      <Head>
        <script
          {...jsonLdScriptProps<Person>({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: author.name,
            image: profilePictureUrl
          })}
        />
      </Head>
      <CurrentPosts title={`Postagens de ${author.name}`} posts={posts}/>
      <Pagination numOfPages={1} curPage='1' basePath={`/autor/${slug}`}/>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authorSlugs = await getAuthorSlugs()
  const paths = authorSlugs.map(({ slug }) => ({ params: { slug } }))
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
  const author = await getAuthorBySlug(slug)
  const posts = await getPostsByAuthorSlug(slug)
  return {
    props: {
      author,
      posts
    }
  }
}
