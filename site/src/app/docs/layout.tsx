import type { Metadata } from "next";
import { Main, KeylinkToNavigation } from 'robindoc';

import { Sidebar } from "./robindoc";

export const metadata: Metadata = {
    title: {
      template: '%s | Robindoc',
      default: 'Robindoc Documentation',
    },
    description: "Robindoc Documentation",
};

const DocsLayout = ({ children }: Readonly<{ children?: JSX.Element }>) => {
    return (
        <Main>
            <Sidebar />
            {children}
            <KeylinkToNavigation />
        </Main>
    );
}

export default DocsLayout;
