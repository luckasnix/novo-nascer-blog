import Layout from '../../containers/layout'
import AuthorList from '../../containers/author-list'
import { getAuthors } from '../../utils/sanity'

export default function Authors({ authors }) {
  return (
    <Layout>
      <AuthorList authors={authors}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const authors = await getAuthors()
  return {
    props: {
      authors
    }
  }
}
