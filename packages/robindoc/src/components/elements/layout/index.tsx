import React from "react";
import { RobinProvider } from "../../blocks/robin-provider";
import { Header, type HeaderProps } from "../../blocks/header";
import { Footer, type FooterProps } from "../../blocks/footer";
import { NavigateProvider } from "../../contexts/navigate/provider";
import { SidebarProvider } from "../../contexts/sidebar/provider";

export interface LayoutProps extends React.PropsWithChildren, HeaderProps, FooterProps {}

export const Layout: React.FC<LayoutProps> = ({
    locales,
    versions,
    logo,
    git,
    link,
    links,
    hidePoweredBy,
    copyright,
    searcher,
    children,
}) => {
    return (
        <RobinProvider>
            <SidebarProvider>
                <NavigateProvider>
                    <Header
                        logo={logo}
                        links={links}
                        link={link}
                        git={git}
                        locales={locales}
                        versions={versions}
                        searcher={searcher}
                    />
                    {children}
                    <Footer copyright={copyright} hidePoweredBy={hidePoweredBy} />
                </NavigateProvider>
            </SidebarProvider>
        </RobinProvider>
    );
};
