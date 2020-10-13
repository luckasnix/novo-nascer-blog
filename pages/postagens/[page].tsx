import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../containers/layout'
import Headline from '../../containers/headline'
import PostList from '../../containers/post-list'
import Pagination from '../../containers/pagination'
import { PostItemProps } from '../../components/post-item'
import { getPostsSlugs, getPostsByPage } from '../../utils/sanity'
import { postsPerPage } from '../../utils/constants'

interface PostsProps {
  posts: PostItemProps[]
  numOfPages: number
}

export default function Posts({ posts, numOfPages }: PostsProps) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const postsSlugs = await getPostsSlugs()
  const numOfPages = Math.ceil(postsSlugs.length / postsPerPage)
  let paths = []
  for (let i = 1; i <= numOfPages; i++) {
    paths.push({ params: { page: i.toString() } })
  }
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { page } = ctx.params
  if (page instanceof Array) {
    page = page[0]
  }
  const posts = await getPostsByPage(+page)
  const postsSlugs = await getPostsSlugs()
  const numOfPages = Math.ceil(postsSlugs.length / postsPerPage)
  return {
    props: {
      posts,
      numOfPages
    }
  }
}
