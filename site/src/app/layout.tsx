import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { Header, Footer, RobinProvider, KeylinkToContent } from 'robindoc';

import { Logo } from "../components/ui/logo";

import "robindoc/lib/styles.css";
import "./globals.css";
import { Theme } from "robindoc/lib/core/types/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://robindoc.com'),
    title: "RobinDoc",
    description: "RobinDoc is a framework for automatically creating documentation websites based on markdown files. Write the documentation however you want, Robindoc will build it on top. Fast, simple, easy",
    openGraph: {
        images: ['/preview.jpg'],
    }
};

const robinTheme: Theme = {}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <RobinProvider
                theme={{
                    colors: {
                        // primary: {
                        //     50: '#f0f9ff',
                        //     100: '#cffafe',
                        //     200: '#a5f3fc',
                        //     300: '#67e8f9',
                        //     400: '#22d3ee',
                        //     500: '#06b6d4',
                        //     600: '#0891b2',
                        //     700: '#0e7490',
                        //     800: '#155e75',
                        //     900: '#164e63',
                        //     950: '#083344',
                        // },
                    }
                }}
            >
                <KeylinkToContent />
                <Header
                    links={[
                        { href: '/docs', title: 'Docs' },
                        { href: '/showcase', title: 'Showcase' },
                    ]}
                    logo={<Logo />}
                    git="https://github.com/vordgi/robindoc"
                    searcher="/api/search"
                />
                    {children}
                <Footer copyright="© 2024 All rights reserved" />
            </RobinProvider>
            <Analytics />
        </body>
    </html>
);

export default RootLayout;
