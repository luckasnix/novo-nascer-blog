import { useRouter } from 'next/router'
import Layout from '../../containers/layout'
import Headline from '../../containers/headline'
import AuthorList from '../../containers/author-list'
import Pagination from '../../containers/pagination'
import { getAuthorsSlugs, getAuthorsByPage } from '../../utils/sanity'
import { POSTS_PER_PAGE } from '../../utils/constants'

export default function Authors({ authors, numOfPages }) {
  const router = useRouter()
  const { page } = router.query
  return (
    <Layout>
      <Headline title='Nossos autores'/>
      <AuthorList authors={authors}/>
      <Pagination numOfPages={numOfPages} curPage={page} basePath='/autores'/>
    </Layout>
  )
}

export async function getStaticPaths() {
  const authorsSlugs = await getAuthorsSlugs()
  const numOfPages = Math.ceil(authorsSlugs.length / POSTS_PER_PAGE)
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
  const authors = await getAuthorsByPage(page)
  const authorsSlugs = await getAuthorsSlugs()
  const numOfPages = Math.ceil(authorsSlugs.length / POSTS_PER_PAGE)
  return {
    props: {
      authors,
      numOfPages
    }
  }
}