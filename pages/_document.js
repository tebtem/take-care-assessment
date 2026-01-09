import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="description" content="Take Care - A self-care assessment by Inner Workout" />
        <meta name="theme-color" content="#a8dadc" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
