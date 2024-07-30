import React from "react";
import { RobinProvider } from "../components/robin-provider";
import { Header, type HeaderProps } from "../components/header";
import { Footer, type FooterProps } from "../components/footer";

export interface LayoutProps extends React.PropsWithChildren, HeaderProps, FooterProps {}

export const Layout: React.FC<LayoutProps> = ({ logo, link, links, copyright, children }) => {
    return (
        <RobinProvider>
            <Header logo={logo} links={links} link={link} />
            {children}
            <Footer copyright={copyright} />
        </RobinProvider>
    );
};
