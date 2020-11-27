import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import CurrentPosts from '../../containers/current-posts'
import Pagination from '../../containers/pagination'
import { PostItemProps } from '../../components/post-item'
import { getPostsSlugs, getPostsByPage } from '../../utils/sanity'
import { postsPerPage } from '../../utils/constants'

export interface PostsProps {
  posts: PostItemProps[]
  numOfPages: number
}

export default function Posts({
  posts,
  numOfPages
}: PostsProps) {
  const router = useRouter()
  const { page } = router.query
  return (
    <>
      <CurrentPosts title='Nossas postagens' posts={posts}/>
      <Pagination numOfPages={numOfPages} curPage={page} basePath='/postagens'/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params: {
    page
  },
  locale
}) => {
  if (page instanceof Array) {
    page = page[0]
  }
  const posts = await getPostsByPage(+page, locale)
  const postsSlugs = await getPostsSlugs(locale)
  const numOfPages = Math.ceil(postsSlugs.length / postsPerPage)
  return {
    props: {
      posts,
      numOfPages
    }
  }
}
