import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { Header, Footer, RobinProvider, KeylinkToContent } from 'robindoc';
import Link from "next/link";

import { Logo } from "../components/ui/logo";

import "robindoc/lib/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Robindoc",
    description: "Robindoc",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <RobinProvider>
                    <KeylinkToContent />
                    <Header
                        links={[
                            { href: '/docs', title: 'Docs' },
                        ]}
                        link={Link}
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
}
