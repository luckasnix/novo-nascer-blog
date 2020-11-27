import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Organization } from 'schema-dts'
import Presentation from '../containers/presentation'
import RecentPosts from '../containers/recent-posts'
import { company } from '../utils/constants'
import { getRecentPosts } from '../utils/sanity'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <script
          {...jsonLdScriptProps<Organization>({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': company.name,
            'telephone': company.telephone,
            'url': company.url,
            'logo': `${company.url}/images/logo-colored.webp`
          })}
        />
      </Head>
      <Presentation/>
      <RecentPosts posts={posts}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const posts = await getRecentPosts(3, locale)
  return {
    props: {
      posts
    }
  }
}
