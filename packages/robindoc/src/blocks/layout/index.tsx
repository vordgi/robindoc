import React from "react";
import { RobinProvider } from "../../components/robin-provider";
import { Header, type HeaderProps } from "../../components/header";
import { Footer, type FooterProps } from "../../components/footer";
import { NavigateProvider } from "../../components/navigate-provider";

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
    searchApiUri,
    children,
}) => {
    return (
        <RobinProvider>
            <NavigateProvider>
                <Header
                    logo={logo}
                    links={links}
                    link={link}
                    git={git}
                    locales={locales}
                    versions={versions}
                    searchApiUri={searchApiUri}
                />
                {children}
                <Footer copyright={copyright} hidePoweredBy={hidePoweredBy} />
            </NavigateProvider>
        </RobinProvider>
    );
};
