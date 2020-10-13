import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Organization } from 'schema-dts'
import Layout from '../containers/layout'
import { company } from '../utils/constants'

export default function Home() {
  return (
    <Layout>
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
      <h1>Bem-vindo ao blog da Novo Nascer!</h1>
    </Layout>
  )
}
