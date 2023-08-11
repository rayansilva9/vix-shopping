import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  
  return (
    <Html lang="pt-BR">
      <Head>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0097fb" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
