import type { Metadata } from 'next'
import { Alumni_Sans } from 'next/font/google'
import './globals.scss'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import { StoreProvider } from './redux/StoreProvider'
import Footer from './components/footer/Footer'

const Alumni = Alumni_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Life Gardens',
    description: 'website for owners',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className={Alumni.className}>
                    <Header />
                    <Menu />
                    {children}
                    <Footer />
                </body>
            </html>
        </StoreProvider>
    )
}
