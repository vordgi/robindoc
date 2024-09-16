import type { Metadata } from "next";
import { Main } from 'robindoc';

export const metadata: Metadata = {
    title: {
      template: '%s | Robindoc',
      default: 'Robindoc Documentation',
    },
    description: "Robindoc Documentation",
};

export default function RootLayout({
    children,
}: Readonly<{ children?: JSX.Element }>) {
    return (
        <Main>
            {children}
        </Main>
    );
}
