import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { AuthorBand } from '@/components/author-band';
import { SiteFooter } from '@/components/site-footer';
import { author, siteName, siteUrl } from '@/lib/site';
import './globals.css';

// saimulislam.com's two families, both OFL: Bricolage Grotesque for everything, JetBrains Mono for code and labels.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  applicationName: siteName,
  authors: [{ name: author.name, url: author.url }],
  creator: author.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only rounded-lg bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        {children}
        <AuthorBand />
        <SiteFooter />
      </body>
    </html>
  );
}
