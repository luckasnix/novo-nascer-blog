import Layout from '../../containers/layout'
import Headline from '../../containers/headline'
import PostList from '../../containers/post-list'
import { getAuthorsSlugs, getAuthorBySlug, getPostsByAuthorSlug } from '../../utils/sanity'

export default function AuthorDetail({ author, posts }) {
  return (
    <Layout>
      <Headline title={`Postagens do(a) ${author.name}`}/>
      <PostList posts={posts}/>
    </Layout>
  )
}

export async function getStaticPaths() {
  const authorsSlugs = await getAuthorsSlugs()
  const paths = authorsSlugs.map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(ctx) {
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
