import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { Header, Footer, RobinProvider, KeylinkToContent } from 'robindoc';

import { Logo } from "../components/ui/logo";

import "robindoc/lib/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Robindoc",
    description: "Robindoc",
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <RobinProvider>
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
