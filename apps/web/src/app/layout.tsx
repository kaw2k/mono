import '../styles/reset.css'
import '../styles/globals.css'
import '../styles/typography.css'
import '../utils/firebase/client'
import 'every-layout/src/index.css'
import { Layout } from '../components/layouts'
import { ThemeContextProvider } from '../hooks/useTheme'

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
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="application-name" content="MyApp" />
        <meta name="apple-mobile-web-app-title" content="MyApp" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body>
        <ThemeContextProvider>
          <Layout>{children}</Layout>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
