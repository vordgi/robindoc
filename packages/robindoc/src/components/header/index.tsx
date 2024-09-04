import "./header.scss";
import React from "react";
import { HeaderMenu } from "../header-menu";
import { Search } from "../search";
import { SectionDropdown } from "../section-dropdown";
import { HeaderSocial } from "../header-social";
import { Container } from "../container";
import { NavLink } from "../nav-link";

type SectionOption = {
    key: string;
    href?: string;
    title: string;
    shortTitle?: string;
};

type SectionType = {
    default?: string;
    target: string;
    list: SectionOption[];
};

export type HeaderProps = {
    logo: React.ReactElement;
    link?: React.ElementType;
    links?: {
        title: string;
        href: string;
    }[];
    git?: string | { uri: string; logo: React.ElementType };
    versions?: SectionType;
    locales?: SectionType;
    searchApiUri?: string;
};

export const Header: React.FC<HeaderProps> = ({
    logo,
    versions,
    locales,
    link: Link = "a",
    links = [],
    git,
    searchApiUri,
}) => {
    const targetVersion = versions?.list.find((version) => version.key === versions.target);
    const versionPrefix = !targetVersion || targetVersion.key === versions?.default ? "" : `/${targetVersion.key}`;
    const targetLocale = locales?.list.find((locale) => locale.key === locales.target);
    const localePrefix = !targetLocale || targetLocale.key === locales?.default ? "" : `/${targetLocale.key}`;

    return (
        <header className="r-header">
            <Container className="r-header-body">
                <div>
                    <NavLink href="/" link={Link} className="r-header-logo">
                        {logo}
                    </NavLink>
                </div>
                <HeaderMenu>
                    <nav className="r-header-nav">
                        {links.map((link) => (
                            <NavLink href={link.href} link={Link} className="r-header-link" key={link.title}>
                                {link.title}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="r-header-actions">
                        <div className="r-header-sections">
                            {versions && targetVersion && (
                                <SectionDropdown
                                    defaultOption={targetVersion.key}
                                    options={versions.list.map((version) => ({
                                        href:
                                            version.href ||
                                            `${localePrefix}${version.key === versions.default ? "" : `/${version.key}`}/`,
                                        key: version.key,
                                        title: version.title,
                                        shortTitle: version.shortTitle,
                                    }))}
                                    link={Link}
                                />
                            )}
                            {locales && targetLocale && (
                                <SectionDropdown
                                    defaultOption={targetLocale.key}
                                    options={locales.list.map((locale) => ({
                                        href:
                                            locale.href ||
                                            `${locale.key === locales.default ? "" : `/${locale.key}`}${versionPrefix}/`,
                                        key: locale.key,
                                        title: locale.title,
                                        shortTitle: locale.shortTitle,
                                    }))}
                                    link={Link}
                                />
                            )}
                        </div>
                        {searchApiUri && <Search link={Link} apiUri={searchApiUri} />}
                    </div>
                </HeaderMenu>
                {git && <HeaderSocial git={git} />}
            </Container>
        </header>
    );
};
