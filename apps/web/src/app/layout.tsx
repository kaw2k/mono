import '../styles/reset.css'
import '../styles/globals.css'
import '../styles/typography.css'
import '../styles/forms.css'
import '../utils/firebase/client'
import 'every-layout/src/index.css'
import { Layout } from '../components/layouts'
import { Providers } from '../providers/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="application-name" content="MyApp" />
        <meta name="apple-mobile-web-app-title" content="MyApp" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
