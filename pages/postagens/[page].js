import { useRouter } from 'next/router'
import Layout from '../../containers/layout'
import Headline from '../../containers/headline'
import PostList from '../../containers/post-list'
import Pagination from '../../containers/pagination'
import { getPostsSlugs, getPostsByPage } from '../../utils/sanity'
import { POSTS_PER_PAGE } from '../../utils/constants'

export default function Posts({ posts, numOfPages }) {
  const router = useRouter()
  const { page } = router.query
  return (
    <Layout>
      <Headline title='Nossas postagens'/>
      <PostList posts={posts}/>
      <Pagination numOfPages={numOfPages} curPage={page} basePath='/postagens'/>
    </Layout>
  )
}

export async function getStaticPaths() {
  const postsSlugs = await getPostsSlugs()
  const numOfPages = Math.ceil(postsSlugs.length / POSTS_PER_PAGE)
  let paths = []
  for (let i = 1; i <= numOfPages; i++) {
    paths.push({ params: { page: i.toString() } })
  }
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(ctx) {
  const { page } = ctx.params
  const posts = await getPostsByPage(page)
  const postsSlugs = await getPostsSlugs()
  const numOfPages = Math.ceil(postsSlugs.length / POSTS_PER_PAGE)
  return {
    props: {
      posts,
      numOfPages
    }
  }
}
