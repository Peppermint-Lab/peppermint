import 'tailwindcss/tailwind.css'
import Head from 'next/head'

import Layout from './component/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Peppermint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp
