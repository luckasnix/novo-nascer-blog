import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import CurrentAuthors from '../../containers/current-authors'
import Pagination from '../../containers/pagination'
import { AuthorItemProps } from '../../components/author-item'
import { getAuthorSlugs, getAuthorsByPage } from '../../utils/sanity'
import { postsPerPage } from '../../utils/constants'

interface AuthorsProps {
  authors: AuthorItemProps[]
  numOfPages: number
}

export default function Authors({
  authors,
  numOfPages
}: AuthorsProps) {
  const router = useRouter()
  const { page } = router.query
  return (
    <>
      <CurrentAuthors title='Nossos autores' authors={authors}/>
      <Pagination numOfPages={numOfPages} curPage={page} basePath='/autores'/>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authorSlugs = await getAuthorSlugs()
  const numOfPages = Math.ceil(authorSlugs.length / postsPerPage)
  let paths = []
  for (let i = 1; i <= numOfPages; i++) {
    paths.push({ params: { page: i.toString() } })
  }
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({
  params: {
    page
  }
}) => {
  if (page instanceof Array) {
    page = page[0]
  }
  const authors = await getAuthorsByPage(+page)
  const authorSlugs = await getAuthorSlugs()
  const numOfPages = Math.ceil(authorSlugs.length / postsPerPage)
  return {
    props: {
      authors,
      numOfPages
    }
  }
}
