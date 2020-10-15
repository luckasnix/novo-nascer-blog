import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import CurrentPosts from '../../containers/current-posts'
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
    <>
      <CurrentPosts title='Nossas postagens' posts={posts}/>
      <Pagination numOfPages={numOfPages} curPage={page} basePath='/postagens'/>
    </>
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
