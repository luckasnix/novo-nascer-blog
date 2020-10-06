import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html lang='pt-BR'>
        <Head>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap'/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Poppins&display=swap'/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
