import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../containers/layout'
import Headline from '../../containers/headline'
import PostList from '../../containers/post-list'
import { AuthorItemProps } from '../../components/author-item'
import { PostItemProps } from '../../components/post-item'
import { getAuthorsSlugs, getAuthorBySlug, getPostsByAuthorSlug } from '../../utils/sanity'

interface AuthorProps {
  author: AuthorItemProps
  posts: PostItemProps[]
}

export default function Author({ author, posts }: AuthorProps) {
  return (
    <Layout>
      <Headline title={`Postagens do(a) ${author.name}`}/>
      <PostList posts={posts}/>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authorsSlugs = await getAuthorsSlugs()
  const paths = authorsSlugs.map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const author = await getAuthorBySlug(slug)
  const posts = await getPostsByAuthorSlug(slug)
  return {
    props: {
      author,
      posts
    }
  }
}
